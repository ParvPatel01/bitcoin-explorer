import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ingestBlockHeightDataAtInterval, ingestSingleBlockDataAtInterval } from "../services/ingestion-services";
import { getLatestBlock } from "../services/latest-block-services";


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
            if (props.setSingleBlock) {
                ingestSingleBlockDataAtInterval(props.query, props.setSingleBlock);
            }
        }
        if (props.query && props.placeholder === 'Block Height') {
            if (props.setBlockHeight) {
                ingestBlockHeightDataAtInterval(props.query, props.setBlockHeight);
            }
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