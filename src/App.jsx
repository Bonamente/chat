import React, { useMemo, useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from './context/auth-context.jsx';
import useAuth from './hooks/useAuth.jsx';

import Layout from './components/layout/Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const AuthProvider = ({ children }) => {
  const curToken = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(Boolean(curToken));

  const logIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  };

  const contextValue = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <Layout>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage socket={socket} />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </AuthProvider>
);

export default App;
