import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        gender: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData);
            setSnackbarMessage('Your account has been created. Please login.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setSnackbarMessage('Mail already exists. Please login.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                setTimeout(() => navigate('/login'), 2000); 
            } else {
                setSnackbarMessage('Error creating account. Please try again.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const handleSigninRedirect = () => {
        navigate('/login');
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
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Typography variant="h5" component="div" sx={{ marginBottom: '16px', textAlign: 'center' }}>
                Signup Form
            </Typography>

            <TextField
                label="Name"
                name="name"
                value={formData.name}
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
                value={formData.password}
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
                value={formData.email}
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

            <FormControl component="fieldset" sx={{ marginTop: '16px' }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }} 
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleSigninRedirect}>
                    Signin
                </Button>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SignupForm;
