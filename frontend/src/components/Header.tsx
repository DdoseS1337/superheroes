import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: '2rem' }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Superhero App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default Header;
