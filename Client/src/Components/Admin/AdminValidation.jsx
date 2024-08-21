import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminValidation = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://startoon-test-2.onrender.com/api/admin-login', credentials);
            setSnackbarMessage('Welcome Admin');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/adminpage');
            }, 1000); 
        } catch (error) {
            setSnackbarMessage('Wrong Credentials');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                backgroundColor: '#fff',
                padding: '0px',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '500px',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
                    backgroundColor: 'white', 
                }}
            >
                <Typography variant="h5" component="div" sx={{ marginBottom: '16px', textAlign: 'center' }}>
                    Admin Login
                </Typography>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                    Login
                </Button>
                <Typography variant="h8" component="div" sx={{ marginTop: '30px', textAlign: 'center' }}>
                    ** Mail and Password as Mentioned in the PDF **
                </Typography>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default AdminValidation;
