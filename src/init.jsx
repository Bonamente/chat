import React from 'react';
import { createRoot } from 'react-dom/client';

import { io } from 'socket.io-client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/index.js';

import App from './App.jsx';

const startApp = () => {
  const container = document.getElementById('chat');
  const root = createRoot(container);
  const socket = io();

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App socket={socket} />
      </BrowserRouter>
    </Provider>,
  );
};

export default startApp;
