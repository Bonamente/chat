import React from 'react';

import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.jsx';

const MainNavigation = () => {
  const { loggedIn, logOut } = useAuth();

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        { loggedIn && <Button type="button" onClick={logOut}>Выйти</Button> }
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
