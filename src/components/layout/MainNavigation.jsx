import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Navbar,
  Container,
  Button,
  Dropdown,
} from 'react-bootstrap';
import useAuth from '../../hooks/useAuth.jsx';

const MainNavigation = () => {
  const { loggedIn, logOut } = useAuth();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguageHandler = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('currentLang', lng);
  };

  return (
    <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('nav.logo_text')}
        </Navbar.Brand>
        <div className="d-flex space-between">
          { loggedIn && <Button type="button" onClick={logOut}>{t('nav.logout_button')}</Button> }
          <Dropdown style={{ marginLeft: 10 }}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {currentLanguage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                onClick={() => changeLanguageHandler('en')}
              >
                En
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => changeLanguageHandler('ru')}
              >
                Ru
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
