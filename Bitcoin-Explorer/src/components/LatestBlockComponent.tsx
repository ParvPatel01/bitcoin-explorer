import { Box, Card, CardContent, Typography } from "@mui/material";
import { LatestBlockModel } from "../models/LatestBlockModel";

type LatestBlockProps = {
    latestBlock: LatestBlockModel | undefined;
}

const LatestBlockComponent = (props: LatestBlockProps) => {

    return (
        <div>
            <Box>
                <Card sx={{ m: 2, minWidth: 560, maxWidth: '840px' }}>
                    <CardContent id='cardContent'>
                        <Typography variant="h5" component="div">
                            Latest Block
                        </Typography>
                        <Typography id='hashId' variant="body2">
                            hash: {props.latestBlock?.hash ?? ''}
                        </Typography>
                        <Typography id='blockHeightId' variant="body2">
                            block_index: {String(props.latestBlock?.block_index ?? '')}
                        </Typography>
                        <Typography id='timeId' variant="body2">
                            time: {String(props.latestBlock?.time ?? '')}
                        </Typography>
                        <Typography id='mainChainId' variant="body2">
                            height: {String(props.latestBlock?.height ?? '')}
                        </Typography>
                    </CardContent>
                </Card>
            </ Box>
        </div>
    );
}

export default LatestBlockComponent;