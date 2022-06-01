import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';
import { hideModal } from '../../store/modalSlice.js';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const Dialog = ({ socket }) => {
  const activeModal = useSelector((state) => state.modal.type);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const onHide = () => {
    dispatch(hideModal());
  };

  if (activeModal === null) return null;

  const ActiveModal = modals[activeModal];

  return (
    <Modal show={isOpen} onHide={onHide} centered>
      <ActiveModal onHide={onHide} socket={socket} />
    </Modal>
  );
};

export default Dialog;
