import React from 'react';

import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavigation = () => (
  <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Hexlet Chat
      </Navbar.Brand>
      <Button>Выйти</Button>
    </Container>
  </Navbar>
);

export default MainNavigation;
