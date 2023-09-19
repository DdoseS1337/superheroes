import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <footer className="footer">
            <Container maxWidth="md">
                <Typography variant="body2" align="center" color="textSecondary" component="p">
                    &copy; 2023 Superhero App
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
