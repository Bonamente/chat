import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChannelList from '../components/channels/ChannelList.jsx';
import MessageList from '../components/messages/MessageList.jsx';

import { selectors as channelSelectors } from '../store/channelsSlice.js';
import { selectors as messageSelectors } from '../store/messagesSlice.js';
import fetchData from '../store/fetchData.js';

const ChatPage = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelSelectors.selectById(state, currentChannelId),
  );

  const channels = useSelector((state) => Object.values(channelSelectors.selectEntities(state)));
  const messages = useSelector((state) => Object.values(messageSelectors.selectEntities(state)));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelList currentChannelId={currentChannelId} channelsData={channels} />
        <MessageList currentChannel={currentChannel} currentMessages={messages} />
      </div>
    </div>
  );
};

export default ChatPage;
