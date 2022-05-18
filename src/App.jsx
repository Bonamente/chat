import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Layout>
);

export default App;
