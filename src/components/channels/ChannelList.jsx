import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Dropdown, Nav } from 'react-bootstrap';

import AddIcon from '../icons/AddIcon.jsx';

import { showModal } from '../../store/modalSlice.js';

const ChannelList = ({ currentChannelId, channelsData, selectChannel }) => {
  const dispatch = useDispatch();

  const showAddModal = () => {
    dispatch(showModal({ type: 'adding', data: null }));
  };

  const showRenameModal = (id) => {
    dispatch(showModal({ type: 'renaming', data: id }));
  };

  const showRemoveModal = (id) => {
    dispatch(showModal({ type: 'removing', data: id }));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={showAddModal}
        >
          <AddIcon />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
        {channelsData.map(({ id, name, removable }) => (
          <Nav.Item as="li" className="w-100" key={id}>
            {removable ? (
              <Dropdown className="d-flex btn-group">
                <Button
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  onClick={() => selectChannel(id)}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  className="flex-grow-0"
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  split
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => showRemoveModal(id)}>
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => showRenameModal(id)}>
                    Переименовать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                className="w-100 rounded-0 text-start"
                variant={id === currentChannelId ? 'secondary' : 'light'}
                onClick={() => selectChannel(id)}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            )}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default ChannelList;
