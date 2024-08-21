import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://startoon-test-2.onrender.com/api/login', loginData);
            sessionStorage.setItem('userData', JSON.stringify(response.data)); 
            setSnackbarMessage('Logged in Successfully');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/userdata');
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Wrong Credentials');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '400px',
                margin: 'auto',
                padding: '16px',
                marginTop: '100px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" component="div" sx={{ marginBottom: '16px', textAlign: 'center' }}>
                Login Form
            </Typography>
            <TextField
                label="Name"
                name="name"
                type="text"
                value={loginData.name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                sx={{
                    '& .MuiInputBase-input': {
                        padding: '10px', 
                        fontSize: '14px', 
                    },
                }}
            />

            <TextField
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                sx={{
                    '& .MuiInputBase-input': {
                        padding: '10px', 
                        fontSize: '14px', 
                    },
                }}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                sx={{
                    '& .MuiInputBase-input': {
                        padding: '10px', 
                        fontSize: '14px', 
                    },
                }}
            />

            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                Login
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginForm;
