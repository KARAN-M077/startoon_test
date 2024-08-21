import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import Adminnav from '../AdminNav/Adminnav';

const BarGraph = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://startoon-test-2.onrender.com/api/admin-data');
                const processedData = processData(response.data);
                setData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const processData = (data) => {
        const countsByMonth = {};

        data.forEach(item => {
            const month = new Date(item.lastLoginDate).toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!countsByMonth[month]) {
                countsByMonth[month] = 0;
            }
            countsByMonth[month] += item.count;
        });

        return Object.keys(countsByMonth).map(month => ({
            month,
            totalCount: countsByMonth[month],
        }));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Adminnav/>
            <Box
            sx={{
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginTop: '16px',
                width: '100%',
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: '16px' }}>Monthly User Count</Typography>
            <Paper elevation={3} sx={{ padding: '16px' }}>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalCount" fill="#8884d8" />
                </BarChart>
            </Paper>
        </Box>
        </Box>
    );
};

export default BarGraph;
