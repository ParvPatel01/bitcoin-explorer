import { Card, CardContent, Typography, CardActions, Button, Box, Collapse, IconButton, IconButtonProps } from "@mui/material";
import { SingleBlock } from "../models/SingleBlock";
import { useState } from "react";
import SearchBar  from './SeachBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

type SingleBlockProp = {
    singleBlock: SingleBlock | undefined;
    setSingleBlock: (value: SingleBlock) => void;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const SingleBlockComponent = (props: SingleBlockProp) => {
    const [query, setQuery] = useState<string>('');
    const [expanded, setExpanded] = useState(false);
    var singleBlockDataTypography;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if(props.singleBlock) {
        singleBlockDataTypography = Object.keys(props.singleBlock).map((key) => {
            if(key === 'hash' || key === 'height' || key === 'time' || key === 'main_chain' || key === 'tx')
                return;
            return (
                <Typography key={key} variant="body2">
                    {key}: {String(props.singleBlock[key])}
                </Typography>
            );              
        }
        );
    }

    return (
        <div>
            <SearchBar placeholder="hash" query={query} setQuery={setQuery} setSingleBlock={props.setSingleBlock} singleBlock={props.singleBlock} />
            <Box>

                <Card sx={{ m: 2, minWidth: 560, maxWidth: '840px' }}>
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
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {singleBlockDataTypography}
                        </CardContent>
                    </Collapse>
                </Card>
            </ Box>
        </ div>
    );
}

export default SingleBlockComponent;