export interface SingleBlock {
    "hash": String,
    "ver": Number,
    "prev_block": String,
    "mrkl_root": String,
    "time": Number,
    "bits": Number,
    "nonce": Number,
    "n_tx": Number,
    "size":Number,
    "block_index": Number,
    "main_chain": Boolean,
    "height": Number,
    "received_time": Number,
    "relayed_by": String,
    "tx": Array<any>;
}