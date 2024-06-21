import LatestBlockComponent from '../components/LatestBlockComponent';
import { Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ingestLatestBlockDataAtInterval } from '../services/ingestion-services';
import { LatestBlockModel } from '../models/LatestBlockModel';
import GraphComponent from '../components/GraphComponent';

const HomeContainer = () => {
    const [latestBlock, setLatestBlock] = useState<LatestBlockModel>();
    const [xAxis, setXAxis] = useState<number[]>([]);
    const [yAxis, setYAxis] = useState<number[]>([]);

    useEffect(() => {
        return () => {
            setTimeout(() => {
                fetch('http://127.0.0.1:7878/graph?search=&')
                    .then(response => response.json())
                    .then(data => {
                        const x = data.values.map((value: any) => {
                            return value.x;
                        });
                        const y = data.values.map((value: any) => {
                            return value.y;
                        });
                        setXAxis(x);
                        setYAxis(y);
                    })
                    .catch(error => console.log(error));
                ingestLatestBlockDataAtInterval(setLatestBlock);
            }, 10000);
        }

    }, []);
console.log(xAxis);
    return (
        <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#103C4F', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LatestBlockComponent latestBlock={latestBlock} />

            <GraphComponent xAxis={xAxis} yAxis={yAxis} />
        </Box>
    );
}

export default HomeContainer;