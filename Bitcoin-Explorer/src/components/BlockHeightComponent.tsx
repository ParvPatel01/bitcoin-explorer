import { Box, Card, CardContent, Typography, CardActions, Button, Avatar, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps } from "@mui/material";
import { BlockHeight } from "../models/BlockHeight";
import SearchBar from "./SeachBar";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

type BlockHeightProps = {
    blockHeight: BlockHeight | undefined;
    setBlockHeight: (value: BlockHeight) => void;
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

const BlockHeightComponent = (props: BlockHeightProps) => {
    const [query, setQuery] = useState<string>('');
    const [expanded, setExpanded] = useState(false);
    var blockHeightDataTypography;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if(props.blockHeight?.blocks[0]) {
        blockHeightDataTypography = Object.keys(props.blockHeight.blocks[0]).map((key) => {
            if(key === 'hash' || key === 'height' || key === 'time' || key === 'main_chain' || key === 'tx')
                return;
            return (
                <Typography key={key} variant="body2">
                    {key}: {String(props.blockHeight?.blocks[0][key])}
                </Typography>
            );              
        });      
    }

    return (
        <div>
            <SearchBar placeholder="Block Height" query={query} setQuery={setQuery} setBlockHeight={props.setBlockHeight} blockHeight={props.blockHeight} />
            <Box>
                <Card sx={{ m: 2, minWidth: 560, maxWidth: '840px' }}>
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
                            {blockHeightDataTypography}
                        </CardContent>
                    </Collapse>
                </Card>
            </ Box>
        </div>
    );
}

export default BlockHeightComponent;