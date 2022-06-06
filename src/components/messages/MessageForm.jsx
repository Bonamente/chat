import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import SendIcon from '../icons/SendIcon.jsx';

const MessageForm = ({ currentChannelId, socket }) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    const message = {
      author: localStorage.getItem('userName'),
      text: values.message,
      channelId: currentChannelId,
    };

    socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        setSubmitting(false);
        resetForm();
        inputRef.current.focus();
      } else {
        // TODO
        console.log('net error!');
      }
    });
  };

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control
            id="message"
            name="message"
            type="text"
            placeholder={t('messageForm.placeholder')}
            aria-label={t('messageForm.new_message')}
            className="border-0 p-0 ps-2"
            ref={inputRef}
            readOnly={formik.isSubmitting}
            {...formik.getFieldProps('message')}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={formik.values.message === '' || formik.isSubmitting}
          >
            <SendIcon />
            <span className="visually-hidden">{t('messageForm.send_button')}</span>
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
