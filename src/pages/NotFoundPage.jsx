import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Container className="text-center pt-5">
    <h1>Страница не найдена</h1>
    <p>
      <span>Но вы можете перейти </span>
      <Link to="/">на главную страницу</Link>
    </p>
  </Container>
);

export default NotFoundPage;
