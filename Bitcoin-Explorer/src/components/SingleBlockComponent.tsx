import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { SingleBlock } from "../models/SingleBlock";
import { useState } from "react";
import SearchBar  from './SeachBar';

type SingleBlockProp = {
    singleBlock: SingleBlock | undefined;
    setSingleBlock: (value: SingleBlock) => void;
}

const SingleBlockComponent = (props: SingleBlockProp) => {
    const [query, setQuery] = useState<string>('');
    return (
        <div>
            <SearchBar placeholder="hash" query={query} setQuery={setQuery} setSingleBlock={props.setSingleBlock} singleBlock={props.singleBlock} />
            <Box>
                <Card sx={{ m: 2, minWidth: 560, maxWidth: '560px' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Single Block
                        </Typography>
                        <Typography variant="body2">
                            hash: {props.singleBlock?.hash ?? ''}
                        </Typography>
                        <Typography variant="body2">
                        height: {String(props.singleBlock?.height ?? '')}
                        </Typography>
                        <Typography variant="body2">
                        time: {String(props.singleBlock?.time ?? '')}
                        </Typography>
                        <Typography variant="body2">
                        main_chain: {String(props.singleBlock?.main_chain ?? '')}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Open</Button>
                    </CardActions>
                </Card>
            </ Box>
        </ div>
    );
}

export default SingleBlockComponent;