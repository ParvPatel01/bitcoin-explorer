import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

type GraphComponentProps = {
    xAxis: number[];
    yAxis: number[];
}

export default function GraphComponent(props: GraphComponentProps) {


    return (
            <div style={{background: "#ffffff", margin: '0 1em', padding: "2em", borderRadius: '1em'}}>
                <h1>Transaction Rate</h1>
                <p>"unit": "Transactions Per Second",</p>
                <p>"period": "minute",</p>
                <p>"description": "The number of Bitcoin transactions added to the mempool per second.",</p>
                <LineChart 
                    xAxis={[{ data: props.xAxis }]}
                    series={[
                        {
                            data: props.yAxis,
                        },
                    ]}
                    width={1000}
                    height={300}
                />
            </div>
    );
}