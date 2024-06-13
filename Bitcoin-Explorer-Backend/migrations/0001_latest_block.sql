CREATE TABLE latest_block (
    hash VARCHAR PRIMARY KEY NOT NULL,
    time INTEGER NOT NULL,
    block_index INTEGER NOT NULL,
    height INTEGER NOT NULL
); 