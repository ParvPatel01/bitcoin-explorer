import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  metric: string;
  setMetric: (value: string) => void;
};

const NavBar = (prop: Props) => {

  const handleChange = (event: SelectChangeEvent) => {
    prop.setMetric(event.target.value as string);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 800 }}>
            BitCoin Explorer
          </Typography>
          <Box sx={{minWidth: '240px'}}>
          <FormControl fullWidth>
            <InputLabel sx={{color: 'white'}} id="demo-simple-select-label">Metric</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={prop.metric}
              label="Metric"
              onChange={handleChange}
              sx={{color: 'white', border: '1px solid white'}}
            >
              <MenuItem value={'singleBlock'}>Single Block</MenuItem>
              <MenuItem value={'blockHeight'}>Block Height</MenuItem>
            </Select>
          </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;