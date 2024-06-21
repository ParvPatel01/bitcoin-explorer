import LatestBlockComponent from '../components/LatestBlockComponent';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ingestLatestBlockDataAtInterval } from '../services/ingestion-services';
import { LatestBlockModel } from '../models/LatestBlockModel';
import GraphComponent from '../components/GraphComponent';
import { getGraphData } from '../services/graphData';


const HomeContainer = () => {
    const [latestBlock, setLatestBlock] = useState<LatestBlockModel>();
    const [xAxis, setXAxis] = useState<number[]>([]);
    const [yAxis, setYAxis] = useState<number[]>([]);
    const [graphPeriod, setGraphPeriod] = useState<string>('');

    useEffect(() => {
        return () => {
            ingestLatestBlockDataAtInterval(setLatestBlock);
            getGraphData()
                .then(data => {
                    const x = Array.prototype.map.call(data.values, (value: any) => {
                        return value.x;
                    });
                    const y = Array.prototype.map.call(data.values, (value: any) => {
                        return value.y;
                    });
                    setXAxis(x);
                    setYAxis(y);
                    setGraphPeriod(data.period);
                })
                .catch(error => console.log(error));        
        }

    }, []);
    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#103C4F', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LatestBlockComponent latestBlock={latestBlock} />

            <GraphComponent xAxis={xAxis} yAxis={yAxis} period={graphPeriod} />
        </Box>
    );
}

export default HomeContainer;