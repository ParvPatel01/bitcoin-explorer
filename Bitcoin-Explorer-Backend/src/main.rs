use reqwest::blocking::Client;
use serde::Deserialize;
use serde_json::json;
use sqlx::{pool, query, Row};
use core::{hash, time};
use std::{error::Error, result};

#[derive(Debug, Deserialize)]
struct LatestBlock {
    hash: String,
    time: u64,
    block_index: i64,
    height: i64
}

async fn create_latest_block(latestBlock: &LatestBlock, pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    let query = "INSERT INTO latest_block (hash, time, block_index, height) VALUES ($1, $2, $3, $4)";
    sqlx::query(query)
        .bind(&latestBlock.hash)
        .bind(&(latestBlock.time as i64))
        .bind(&(latestBlock.block_index as i64))
        .bind(&(latestBlock.height as i64))
        .execute(pool)
        .await?;

    Ok(())
}

async fn update_latest_block(latestBlock: &LatestBlock, hash: &String, pool: &sqlx::PgPool) -> Result<(), sqlx::Error> {
    let query = "UPDATE latest_block SET time = $1, block_index = $2, height = $3 WHERE hash = $4";
    sqlx::query(query)
        .bind(&(latestBlock.time as i64))
        .bind(&(latestBlock.block_index as i64))
        .bind(&(latestBlock.height as i64))
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

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let url = "postgres://myadmin:Qwert12345@bitcoin.postgres.database.azure.com:5432/postgres";
    let pool = sqlx::postgres::PgPool::connect(url).await?;

    sqlx::migrate!("./migrations").run(&pool).await?;

    let latest_block = blocking_get().await?;

    create_latest_block(&latest_block, &pool).await?;

    Ok(())
}

async fn blocking_get() -> Result<(LatestBlock), Box<dyn Error>> {
    let res = reqwest::get("https://blockchain.info/latestblock").await?;
    let latest_block: LatestBlock = res.json().await?;

    Ok((latest_block))
}