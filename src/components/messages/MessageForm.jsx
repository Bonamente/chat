import React, { useEffect, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';

import SendIcon from '../icons/SendIcon.jsx';

const MessageForm = ({ currentChannelId }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // TODO
  const onSubmit = () => { console.log(currentChannelId); };

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
            {...formik.getFieldProps('message')}
          />
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={formik.values.message === ''}
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
