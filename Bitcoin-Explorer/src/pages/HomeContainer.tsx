import { SingleBlock } from '../models/SingleBlock';
import { BlockHeight } from '../models/BlockHeight';
import SingleBlockComponent from '../components/SingleBlockComponent';
import BlockHeightComponent from '../components/BlockHeightComponent';
import LatestBlockComponent from '../components/LatestBlockComponent';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { ingestLatestBlcokDataAtInterval } from '../services/ingestion-services';
import { LatestBlockModel } from '../models/LatestBlockModel';
import { getLatestBlock } from '../services/latest-block-services';


type Props = {
    metric: string;
}

const HomeContainer = (props: Props) => {
    const [singleBlock, setSingleBlock] = useState<SingleBlock>();
    const [blockHeight, setBlockHeight] = useState<BlockHeight>();
    const [latestBlock, setLatestBlock] = useState<LatestBlockModel>();

    useEffect(() => {
        return () => {
            ingestLatestBlcokDataAtInterval(setLatestBlock);
        }

    }, []);
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
        </Box>
    );
}

export default HomeContainer;