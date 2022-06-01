import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChannelList from '../components/channels/ChannelList.jsx';
import MessageList from '../components/messages/MessageList.jsx';
import Dialog from '../components/modals/index.jsx';

import fetchData from '../store/fetchData.js';
import { addMessage, selectors as messageSelectors } from '../store/messagesSlice.js';
import {
  addChannel,
  renameChannel,
  removeChannel,
  changeCurrentChannel,
  selectors as channelSelectors,
} from '../store/channelsSlice.js';

const ChatPage = ({ socket }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelSelectors.selectById(state, currentChannelId),
  );

  const channels = useSelector((state) => Object.values(channelSelectors.selectEntities(state)));
  const messages = useSelector((state) => Object.values(messageSelectors.selectEntities(state)));

  const dispatch = useDispatch();

  const selectChannelHandler = (id) => {
    dispatch(changeCurrentChannel({ id }));
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(changeCurrentChannel({ id: channel.id }));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel({ id }));
    });

    dispatch(fetchData());
  }, [dispatch, socket]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelList
          currentChannelId={currentChannelId}
          channelsData={channels}
          selectChannel={selectChannelHandler}
          socket={socket}
        />
        <MessageList
          currentChannel={currentChannel}
          currentMessages={messages.filter((m) => m.channelId === currentChannelId)}
          socket={socket}
        />
        <Dialog socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
