import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { getSingleBlockByHashValue } from "../services/single-block-services";
import { getBlockHeight } from "../services/block-height-services";
import { BlockHeight } from "../models/BlockHeight";

type Props = {
    placeholder: string;
    query?: string;
    setQuery?: (query: string) => void;
    singleBlock?: any;
    setSingleBlock?: (value: any) => void;
    blockHeight?: any;
    setBlockHeight?: (value: any) => void;
}

const SearchBar = (props: Props) => {
    const handleSearch = () => {
        console.log('searching');
        const searchParam = document.getElementById('searchParam') as HTMLInputElement;
        if (searchParam.value && props.setQuery) {
            props.setQuery(searchParam.value);
        }

        if (props.query && props.placeholder === 'hash') {
            getSingleBlockByHashValue(props.query)
                .then(data => {
                    if (props.setSingleBlock) {
                        props.setSingleBlock(data);
                    }
                })
        }
        if (props.query && props.placeholder === 'Block Height') {
            console.log(props.placeholder, props.query);
            getBlockHeight(Number(props.query))
                .then((data: BlockHeight[]) => {
                    // handleAddingValueToBlockHeightCard(data);
                    if (props.setBlockHeight) {
                        props.setBlockHeight(data);
                    }
                }
          )
        }
    }

    return (
        <Paper
            component="form"
            sx={{ mt: 2, p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
            <InputBase
                id="searchParam"
                sx={{ ml: 1, flex: 1 }}
                placeholder={'Search ' + props.placeholder}
                inputProps={{ 'aria-label': `search ${props.placeholder}` }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );

}

export default SearchBar;