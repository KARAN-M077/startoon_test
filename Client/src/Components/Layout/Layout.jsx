import React from 'react';
import {Box} from  '@mui/material';
import { useLocation } from 'react-router-dom';
import Nav from '../Navbar/Nav';

const Layout = ({ children }) => {
    const location = useLocation();
    const shouldShowNav = !['/userdata','/admin-validation','/adminpage','/barchart'].includes(location.pathname);

    return (
        <div>
            {shouldShowNav && <Nav />}
            <Box > 
                {children}
            </Box>
        </div>
    );
};

export default Layout;
