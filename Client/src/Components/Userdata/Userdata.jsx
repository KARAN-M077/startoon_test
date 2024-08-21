import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Userdata = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            navigate('/login'); 
        }
    }, [navigate]);

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5', 
                padding: '16px',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: '24px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '600px', 
                    textAlign: 'center', 
                }}
            >
                <Typography variant="h4" gutterBottom>
                    User Data
                </Typography>
                <Typography variant="h6">
                    <strong>Name:</strong> {userData.name}
                </Typography>
                <Typography variant="h6">
                    <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography variant="h6">
                    <strong>Gender:</strong> {userData.gender}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Userdata;
