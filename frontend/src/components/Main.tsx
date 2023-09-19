import React, { ReactNode } from 'react';
import { Container } from '@mui/material';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Container maxWidth="md">
      {children}
    </Container>
  );
};

export default Main;
