import { SingleBlock } from '../models/SingleBlock';
import { BlockHeight } from '../models/BlockHeight';
import SingleBlockComponent from '../components/SingleBlockComponent';
import BlockHeightComponent from '../components/BlockHeightComponent';
import LatestBlockComponent from '../components/LatestBlockComponent';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ingestLatestBlcokDataAtInterval } from '../services/ingestion-services';
import { LatestBlockModel } from '../models/LatestBlockModel';
import GraphComponent from '../components/GraphComponent';
import { getLatestBlock } from '../services/latest-block-services';


type Props = {
    metric: string;
}

const HomeContainer = (props: Props) => {
    const [singleBlock, setSingleBlock] = useState<SingleBlock>();
    const [blockHeight, setBlockHeight] = useState<BlockHeight>();
    const [latestBlock, setLatestBlock] = useState<LatestBlockModel>();
    const [xAxis, setXAxis] = useState<number[]>([]);
    const [yAxis, setYAxis] = useState<number[]>([]);

    useEffect(() => {
        return () => {
            fetch('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            .then(response => response.json())
            .then(data => {
                const x = data.values.map((value: any) => {
                    return value.x;
                });
                const y = data.values.map((value: any) => {
                    return value.y;
                });
                setXAxis(x);
                setYAxis(y);
            })
            .catch(error => console.log(error));
            ingestLatestBlcokDataAtInterval(setLatestBlock);
        }

    }, []);
console.log(xAxis);
    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#103C4F', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                props.metric === 'singleBlock' && (
                    <SingleBlockComponent singleBlock={singleBlock} setSingleBlock={setSingleBlock} />
                )

            }

            {
                props.metric === 'blockHeight' && (
                    <BlockHeightComponent blockHeight={blockHeight} setBlockHeight={setBlockHeight} />
                )
            }
            <LatestBlockComponent latestBlock={latestBlock} />

            <GraphComponent xAxis={xAxis} yAxis={yAxis} />
        </Box>
    );
}

export default HomeContainer;