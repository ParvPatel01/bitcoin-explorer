use reqwest::Identity;
use serde::{Deserialize, Serialize};
use sqlx::Row;
use std::{
    any::Any, error::Error, fs::{self, read}, io::prelude::*, net::{TcpListener, TcpStream}, thread::sleep, time::{Duration, Instant}
};

#[derive(Debug, Deserialize, Serialize)]
struct LatestBlock {
    hash: String,
    time: u64,
    block_index: i64,
    height: i64,
}

async fn create_latest_block(
    latest_block: &LatestBlock,
    pool: &sqlx::PgPool,
) -> Result<(), sqlx::Error> {
    let query =
        "INSERT INTO latest_block (hash, time, block_index, height) VALUES ($1, $2, $3, $4)";
    sqlx::query(query)
        .bind(&latest_block.hash)
        .bind(&(latest_block.time.to_string()))
        .bind(&(latest_block.block_index.to_string()))
        .bind(&(latest_block.height.to_string()))
        .execute(pool)
        .await?;
    println!("Inserted Latest Block: {:?}", latest_block);
    Ok(())
}

// async fn update_latest_block(
//     latest_block: &LatestBlock,
//     hash: &String,
//     pool: &sqlx::PgPool,
// ) -> Result<(), sqlx::Error> {
//     let query = "UPDATE latest_block SET time = $1, block_index = $2, height = $3 WHERE hash = $4";
//     sqlx::query(query)
//         .bind(&(latest_block.time as i64))
//         .bind(&(latest_block.block_index as i64))
//         .bind(&(latest_block.height as i64))
//         .bind(&hash)
//         .execute(pool)
//         .await?;

//     Ok(())
// }

// still need debugging
async fn read_latest_block(conn: &sqlx::PgPool) -> Result<LatestBlock, sqlx::Error> {
    let q = "SELECT latest_block_id, hash, time, block_index, height FROM latest_block ORDER BY latest_block_id DESC LIMIT 1";
    let query = sqlx::query(q);
    let row = query.fetch_one(conn).await?;
    let hash: String = row.get(1);
    let time: String = row.get(2);
    let block_index: String = row.get(3);
    let height: String = row.get(4);
    let latest_block = LatestBlock {
        hash: hash,
        time: time.parse().unwrap(),
        block_index: block_index.parse().unwrap(),
        height: height.parse().unwrap(),
    };

    Ok(latest_block)
}

async fn blocking_get() -> Result<LatestBlock, Box<dyn Error>> {
    let res = reqwest::get("https://blockchain.info/latestblock").await?;
    let latest_block: LatestBlock = res.json().await?;
    println!("Fetched Latest Block: {:?}", latest_block);
    Ok(latest_block)
}

async fn handle_connection(mut stream: TcpStream, pool: sqlx::PgPool) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let latest_block = read_latest_block(&pool).await.unwrap();
    let latest_block_json = serde_json::to_string(&latest_block).unwrap();
    let response = format!(
        "HTTP/1.1 200 OK\r\n\
             Content-Length: {}\r\n\
             Content-Type: application/json\r\n\
             Access-Control-Allow-Origin: *\r\n\
             Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n\
             Access-Control-Allow-Headers: Content-Type\r\n\
             \r\n\
             {}",
        latest_block_json.len(),
        latest_block_json
    );
    println!("Response: {:?}", response);
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

#[tokio::main]
async fn main() {
    let url = "postgres://myadmin:Qwert12345@bitcoin.postgres.database.azure.com:5432/postgres";

    let addr = "127.0.0.1:7878";
    let listner = TcpListener::bind(addr).unwrap();
    println!("Listening on {}", addr);
    
    for stream in listner.incoming() {
        let stream = stream.unwrap();
        let pool = sqlx::postgres::PgPool::connect(url).await.unwrap();
        let _ = sqlx::migrate!("./migrations").run(&pool).await;
        let latest_block = blocking_get().await.unwrap();
        let past_block = read_latest_block(&pool).await.unwrap();
        if latest_block.hash != past_block.hash {
            create_latest_block(&latest_block, &pool).await.unwrap();
        }
        handle_connection(stream, pool).await;
        println!("Connection established!");
    }
}
