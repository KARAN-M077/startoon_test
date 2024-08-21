import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Adminnav = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Button component={Link} to="/adminpage" color="inherit" sx={{ marginRight: '16px' }}>
                        HOME
                    </Button>
                    <Button component={Link} to="/barchart" color="inherit">
                        GRAPH
                    </Button>
                </Box>
                <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                    >
                        Log-out
                    </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Adminnav;
