import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import store from './store/index.js';
import resources from './locales/index.js';

import App from './App.jsx';

const startApp = async () => {
  const currentLanguage = localStorage.getItem('currentLang') || 'ru';

  const socket = io();

  const i18nextInstance = i18n.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: currentLanguage,
      resources,
    });

  const container = document.getElementById('chat');
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App socket={socket} />
      </BrowserRouter>
    </Provider>,
  );
};

export default startApp;
