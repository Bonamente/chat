import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../../store/channelsSlice.js';

const Rename = ({ onHide, socket }) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channels = useSelector((state) => Object.values(channelSelectors.selectEntities(state)));
  const currentChannelId = useSelector((state) => state.modal.data);

  const channelNames = channels.map(({ name }) => name);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('errors.modal.required'))
      .min(3, t('errors.modal.length'))
      .max(20, t('errors.modal.length'))
      .notOneOf(channelNames, t('errors.modal.unique')),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const renamedChannel = { name: values.name, id: currentChannelId };

    socket.emit('renameChannel', renamedChannel, (response) => {
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
    initialValues: { name: currentChannel.name },
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
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
              {t('modal.rename.name')}
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
              {t('modal.rename.cancel_button')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('modal.rename.submit_button')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
