import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                elevation: 4,
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Startoon Labs Pvt.LTD
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/admin-validation"
                    >
                        Admin
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Nav;
