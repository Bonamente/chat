import React from 'react';

import LoginForm from '../components/forms/LoginForm.jsx';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-6 col-xxl-4">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default LoginPage;
