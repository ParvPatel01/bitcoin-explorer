import { SingleBlock } from '../models/SingleBlock';
import { BlockHeight } from '../models/BlockHeight';
import SingleBlockComponent from '../components/SingleBlockComponent';
import BlockHeightComponent from '../components/BlockHeightComponent';
import { Box } from '@mui/material';
import { useState } from 'react';

type Props = {
    metric: string;
}

const HomeContainer = (props: Props) => {
    const [singleBlock, setSingleBlock] = useState<SingleBlock>();
    const [blockHeight, setBlockHeight] = useState<BlockHeight>();
    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#103C4F', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {
                props.metric === 'singleBlock' && (
                    <SingleBlockComponent  singleBlock={singleBlock} setSingleBlock={setSingleBlock} />
                )

            }

            {
                props.metric === 'blockHeight' && (
                    <BlockHeightComponent blockHeight={blockHeight}  setBlockHeight={setBlockHeight}/>
                )
            }
        </Box>
    );
}

export default HomeContainer;