import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { BlockHeight } from "../models/BlockHeight";
import SearchBar from "./SeachBar";
import { useEffect, useState } from "react";

type BlockHeightProps = {
    blockHeight: BlockHeight | undefined;
    setBlockHeight: (value: BlockHeight) => void;
}

const BlockHeightComponent = (props: BlockHeightProps) => {
    const [query, setQuery] = useState<string>('');
    console.log('blockHeight', props.blockHeight);
    return (
        <div>
            <SearchBar placeholder="Block Height" query={query} setQuery={setQuery} setBlockHeight={props.setBlockHeight} blockHeight={props.blockHeight} />
            <Box>
                <Card sx={{ m: 2, minWidth: 275, maxWidth: '560px' }}>
                    <CardContent id='cardContent'>
                        <Typography variant="h5" component="div">
                            Block Height
                        </Typography>
                        <Typography id='hashId' variant="body2">
                            hash: {props.blockHeight?.blocks[0].hash ?? ''}
                        </Typography>
                        <Typography id='blockHeightId' variant="body2">
                        height: {String(props.blockHeight?.blocks[0].height ?? '')}
                        </Typography>
                        <Typography id='timeId' variant="body2">
                        time: {String(props.blockHeight?.blocks[0].time ?? '')}
                        </Typography>
                        <Typography id='mainChainId' variant="body2">
                        main_chain: {String(props.blockHeight?.blocks[0].main_chain ?? '')}
                        </Typography>
                    </CardContent>
                </Card>
            </ Box>
        </div>
    );
}

export default BlockHeightComponent;