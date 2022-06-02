import React, { useEffect, useRef, useState } from 'react';

import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import useAuth from '../../hooks/useAuth.jsx';
import routes from '../../routes.js';

const SignUpForm = () => {
  const auth = useAuth();
  const [signUpFailed, setSignUpFailed] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    username: yup.string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  const onSubmit = async ({ username, password }, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const { data } = await axios.post(routes.signUpPath(), { username, password });
      auth.logIn(data);
      navigate('/');
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setSignUpFailed(true);
        inputRef.current.select();
        setSubmitting(false);
        return;
      }
      if (err.response.status === 409) {
        setSignUpFailed(true);
        inputRef.current.select();
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-4">Регистрация</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Имя пользователя"
              required
              ref={inputRef}
              readOnly={formik.isSubmitting}
              isInvalid={formik.errors.username || signUpFailed}
              {...formik.getFieldProps('username')}
            />
            <Form.Label htmlFor="username">
              Имя пользователя
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              placeholder="Пароль"
              required
              readOnly={formik.isSubmitting}
              isInvalid={(formik.touched.password && formik.errors.password) || signUpFailed}
              {...formik.getFieldProps('password')}
            />
            <Form.Label htmlFor="password">
              Пароль
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              placeholder="Подтвердите пароль"
              required
              readOnly={formik.isSubmitting}
              isInvalid={formik.errors.confirmPassword || signUpFailed}
              {...formik.getFieldProps('confirmPassword')}
            />
            <Form.Label htmlFor="confirmPassword">
              Подтвердите пароль
            </Form.Label>
            {formik.errors.confirmPassword
              && (
              <Form.Control.Feedback type="invalid" tooltip>
                Пароли должны совпадать
              </Form.Control.Feedback>
              )}
            {!formik.errors.confirmPassword && signUpFailed
              && (
              <Form.Control.Feedback type="invalid" tooltip>
                Такой пользователь уже существует
              </Form.Control.Feedback>
              )}
          </Form.Group>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
          >
            Зарегистрироваться
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUpForm;
