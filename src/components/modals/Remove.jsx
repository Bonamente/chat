import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Remove = ({ onHide, socket }) => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.lead')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          onClick={onHide}
        >
          {t('modal.remove.cancel_button')}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={removeChannelHandler}
        >
          {t('modal.remove.submit_button')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Remove;
