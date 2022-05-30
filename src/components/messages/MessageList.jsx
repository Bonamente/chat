import React from 'react';

import MessageForm from './MessageForm.jsx';

const MessageList = ({ currentChannel, currentMessages, socket }) => (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">
          {currentMessages.length}
          { ' сообщений'}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5"
      >
        {currentMessages.map(({ author, text, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{author}</b>
            {`: ${text}`}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <MessageForm currentChannelId={currentChannel?.id} socket={socket} />
      </div>
    </div>
  </div>
);

export default MessageList;
