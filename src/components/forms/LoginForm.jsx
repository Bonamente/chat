import React from 'react';

import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
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
              type="text"
              id="username"
              name="username"
              placeholder="Ваш ник"
              {...formik.getFieldProps('username')}
            />
            <Form.Label>Ваш ник</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
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
