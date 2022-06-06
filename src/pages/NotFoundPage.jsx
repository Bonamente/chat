import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="text-center pt-5">
      <h1>{t('notFound.title')}</h1>
      <p>
        <span>{t('notFound.lead')}</span>
        <Link to="/">{t('notFound.link')}</Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;
