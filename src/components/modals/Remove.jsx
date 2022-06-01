import React from 'react';

import { Button, Modal } from 'react-bootstrap';

import { useSelector } from 'react-redux';

const Remove = ({ onHide, socket }) => {
  const currentChannelId = useSelector((state) => state.modal.data);

  const removeChannelHandler = () => {
    const channelToRemove = { id: currentChannelId };

    socket.emit('removeChannel', channelToRemove, (response) => {
      const { status } = response;

      if (status === 'ok') {
        onHide();
      } else {
        // TODO
        console.log('net error!');
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          onClick={onHide}
        >
          Отменить
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={removeChannelHandler}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Remove;
