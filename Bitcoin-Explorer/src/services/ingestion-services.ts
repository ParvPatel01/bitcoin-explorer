import { getSingleBlockByHashValue } from '../services/single-block-services';
import { getBlockHeight } from '../services/block-height-services';

const getSingleBlockData = (query: string, setSingleBlock: Function) => {
    getSingleBlockByHashValue(query)
    .then((data : any) => {
        if (setSingleBlock) {
            setSingleBlock(data);
            console.log('SingleBlock: ', data);
        }
    })
};

const getBlockHeightData = (query: string, setBlockHeight: Function) => {
    getBlockHeight(Number(query))
            .then((data : any) => {
                if (setBlockHeight) {
                    setBlockHeight(data);
                    console.log('BlockHeight: ', data);
                }
            })
};


const ingestSingleBlockDataAtInterval = (query: string, setSingleBlock: Function) => {
    getSingleBlockData(query, setSingleBlock);
    setInterval(() => {
        getSingleBlockData(query, setSingleBlock);
    }, 10 * 60 * 1000)
};

const ingestBlockHeightDataAtInterval = (query: string, setBlockHeight: Function) => {
    getBlockHeightData(query, setBlockHeight);
    setInterval(() => {
        getBlockHeightData(query, setBlockHeight);
    },  10 * 60 * 1000)
};

export { ingestSingleBlockDataAtInterval, ingestBlockHeightDataAtInterval };