use serde::Deserialize;
use std::{error::Error, thread::sleep, time::{Duration, Instant}};

#[derive(Debug, Deserialize)]
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

async fn update_latest_block(
    latest_block: &LatestBlock,
    hash: &String,
    pool: &sqlx::PgPool,
) -> Result<(), sqlx::Error> {
    let query = "UPDATE latest_block SET time = $1, block_index = $2, height = $3 WHERE hash = $4";
    sqlx::query(query)
        .bind(&(latest_block.time as i64))
        .bind(&(latest_block.block_index as i64))
        .bind(&(latest_block.height as i64))
        .bind(&hash)
        .execute(pool)
        .await?;

    Ok(())
}

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

async fn upload_latest_block_every_n_minutes(t: u64, pool: sqlx::PgPool) {
    let interval = Duration::from_secs(t * 60);
    let mut next_time = Instant::now() + interval;
    loop {
        let latest_block = blocking_get().await.unwrap();
        create_latest_block(&latest_block, &pool).await.unwrap();
        println!("Latest Block Added! (10min interval started)");
        sleep(next_time - Instant::now());
        next_time += interval;
    }
}

#[tokio::main]
async fn main() {
    let url = "postgres://myadmin:Qwert12345@bitcoin.postgres.database.azure.com:5432/postgres";
    let pool = sqlx::postgres::PgPool::connect(url).await.unwrap();

    sqlx::migrate!("./migrations").run(&pool).await;

    
    upload_latest_block_every_n_minutes(1, pool).await;
}
