/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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
  const { t } = useTranslation();

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
      .required(t('errors.signup.required'))
      .min(3, t('errors.signup.username_length'))
      .max(20, t('errors.signup.username_length')),
    password: yup.string()
      .required(t('errors.signup.required'))
      .min(6, t('errors.signup.password_min_length')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('errors.signup.passwords_not_equal')),
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
      toast.error(t('toasts.net_error'));
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
          <h1 className="text-center mb-4">{t('signUpForm.title')}</h1>
          <Form.Group className="form-floating mb-3">
            <Form.Control
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder={t('signUpForm.username')}
              required
              ref={inputRef}
              readOnly={formik.isSubmitting}
              isInvalid={formik.errors.username || signUpFailed}
              {...formik.getFieldProps('username')}
            />
            <Form.Label htmlFor="username">
              {t('signUpForm.username')}
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
              placeholder={t('signUpForm.password')}
              required
              readOnly={formik.isSubmitting}
              isInvalid={(formik.touched.password && formik.errors.password) || signUpFailed}
              {...formik.getFieldProps('password')}
            />
            <Form.Label htmlFor="password">
              {t('signUpForm.password')}
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
              placeholder={t('signUpForm.password_confirmation')}
              required
              readOnly={formik.isSubmitting}
              isInvalid={formik.errors.confirmPassword || signUpFailed}
              {...formik.getFieldProps('confirmPassword')}
            />
            <Form.Label htmlFor="confirmPassword">
              {t('signUpForm.password_confirmation')}
            </Form.Label>
            {formik.errors.confirmPassword
              && (
              <Form.Control.Feedback type="invalid" tooltip>
                {t('errors.signup.passwords_not_equal')}
              </Form.Control.Feedback>
              )}
            {!formik.errors.confirmPassword && signUpFailed
              && (
              <Form.Control.Feedback type="invalid" tooltip>
                {t('errors.signup.username_not_unique')}
              </Form.Control.Feedback>
              )}
          </Form.Group>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
          >
            {t('signUpForm.signup_button')}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUpForm;
