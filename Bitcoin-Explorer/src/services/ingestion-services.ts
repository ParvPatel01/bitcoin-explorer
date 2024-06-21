import { getLatestBlock } from '../services/latest-block-services';

const ingestLatestBlockDataAtInterval = (setLatestBlock: Function) => {
    console.log('Ingesting latest block data');
    getLatestBlock()
    .then((data : any) => {
        console.log('data recieved: ');
        if (setLatestBlock) {
            setLatestBlock(data);
            console.log('LatestBlock: ', data);
        }
    }).catch((error) => {
        console.log('Error: ', error);
    })
    setInterval(() => {
        getLatestBlock()
        .then((data : any) => {
            console.log('data recieved: ');
            if (setLatestBlock) {
                setLatestBlock(data);
                console.log('LatestBlock: ', data);
            }
        });
    },  10 * 60 * 1000)
};

export { ingestLatestBlockDataAtInterval };