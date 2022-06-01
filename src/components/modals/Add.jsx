import React, { useEffect, useRef } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../../store/channelsSlice.js';

const Add = ({ onHide, socket }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channels = useSelector((state) => Object.values(channelSelectors.selectEntities(state)));
  const channelNames = channels.map(({ name }) => name);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const newChannel = { name: values.name };

    socket.emit('newChannel', newChannel, (response) => {
      const { status } = response;

      if (status === 'ok') {
        setSubmitting(false);
        onHide();
      } else {
        // TODO
        console.log('net error!');
      }
    });
  };

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              name="name"
              type="text"
              className="mb-2"
              ref={inputRef}
              isInvalid={formik.errors.name}
              disabled={formik.isSubmitting}
              {...formik.getFieldProps('name')}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              value="cancel"
              onClick={onHide}
            >
              Отменить
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Отправить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
