import React, { useEffect, useRef, useState } from 'react';

import { Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const onSubmit = async (values) => {
    setAuthFailed(false);

    try {
      const { data } = await axios.post(routes.loginPath(), values);
      auth.logIn(data);
      navigate('/');
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5 justify-content-center">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Войти</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Ваш ник"
              required
              ref={inputRef}
              isInvalid={authFailed}
              {...formik.getFieldProps('username')}
            />
            <Form.Label>Ваш ник</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Пароль"
              required
              isInvalid={authFailed}
              {...formik.getFieldProps('password')}
            />
            <Form.Label>Пароль</Form.Label>
            <Form.Control.Feedback type="invalid">
              Неверные имя пользователя или пароль
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
          >
            Войти
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="p-4">
        <Card.Text className="text-center">
          <span>Нет аккаунта? </span>
          <Link to="/signup">Регистрация</Link>
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
