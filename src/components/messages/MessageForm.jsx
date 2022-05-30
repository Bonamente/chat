import React, { useEffect, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';

import SendIcon from '../icons/SendIcon.jsx';

const MessageForm = ({ currentChannelId, socket }) => {
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
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
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
            <span className="visually-hidden">Отправить</span>
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
