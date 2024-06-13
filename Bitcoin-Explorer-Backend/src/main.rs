use serde::{Deserialize, Serialize};
use std::{
    error::Error,
    io::prelude::*,
    net::TcpListener,
    net::TcpStream,
    thread::sleep,
    time::{Duration, Instant},
    fs,
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
        .bind(&(latest_block.time as i64))
        .bind(&(latest_block.block_index as i64))
        .bind(&(latest_block.height as i64))
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
// async fn read_latest_block(conn: &sqlx::PgPool) -> Result<(), sqlx::Error> {
//     let q = "SELECT hash, time, block_index, height FROM latest_block";
//     let query = sqlx::query(q);
//     let row = query.fetch_one(conn).await?;

//     let hash: String = row.get(0);
//     let time: u64 = row.get(1);
//     let block_index: i64 = row.get(2);
//     let height: i64 = row.get(3);

//     println!("{:?}", time);
//     Ok(())
// }

async fn blocking_get() -> Result<LatestBlock, Box<dyn Error>> {
    let res = reqwest::get("https://blockchain.info/latestblock").await?;
    let latest_block: LatestBlock = res.json().await?;
    println!("Fetched Latest Block: {:?}", latest_block);
    Ok(latest_block)
}

// async fn upload_latest_block_every_n_minutes(t: u64, pool: sqlx::PgPool) {
//     let interval = Duration::from_secs(t * 60);
//     let mut next_time = Instant::now() + interval;
//     loop {
//         let latest_block = blocking_get().await.unwrap();
//         create_latest_block(&latest_block, &pool).await.unwrap();
//         println!("Latest Block Added! (10min interval started)");
//         sleep(next_time - Instant::now());
//         next_time += interval;
//     }
// }

async fn handle_connection(mut stream: TcpStream, pool: sqlx::PgPool) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();
    let latest_block = blocking_get().await.unwrap();
    create_latest_block(&latest_block, &pool).await.unwrap();
    let latest_block_json = serde_json::to_string(&latest_block).unwrap();
    println!("Latest Block JSON: {:?}", latest_block_json);
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
        handle_connection(stream, pool).await;
        println!("Connection established!");
    }
}
