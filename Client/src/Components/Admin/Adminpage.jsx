import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Adminnav from '../AdminNav/Adminnav';

const Adminpage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://startoon-test-2.onrender.com/api/admin-data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Adminnav />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    marginTop: '16px',
                    width: '100%',
                    overflowX: 'auto', 
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ 
                        marginBottom: '16px',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                    }}
                >
                    Dashboard
                </Typography>
                <TableContainer 
                    component={Paper} 
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                    }}
                >
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>Name</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>Email</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>Count</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>Gender</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>Last Login Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{user.name}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{user.email}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{user.count}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{user.gender}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Adminpage;
