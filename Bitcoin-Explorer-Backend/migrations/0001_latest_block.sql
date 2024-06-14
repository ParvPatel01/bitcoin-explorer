CREATE TABLE latest_block (
    latest_block_id SERIAL PRIMARY KEY,
    hash VARCHAR NOT NULL,
    time VARCHAR NOT NULL,
    block_index VARCHAR NOT NULL,
    height VARCHAR NOT NULL
); 