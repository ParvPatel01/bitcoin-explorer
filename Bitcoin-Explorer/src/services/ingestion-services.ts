import { getLatestBlock } from '../services/latest-block-services';

const ingestLatestBlockDataAtInterval = (setLatestBlock: Function) => {
    getLatestBlock()
    .then((data : any) => {
        if (setLatestBlock) {
            setLatestBlock(data);
        }
    }).catch((error) => {
        console.log('Error: ', error);
    })
    setInterval(() => {
        getLatestBlock()
        .then((data : any) => {
            if (setLatestBlock) {
                setLatestBlock(data);
            }
        });
    },  10 * 60 * 1000)
};

export { ingestLatestBlockDataAtInterval };