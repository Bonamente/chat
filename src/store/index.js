import { configureStore } from '@reduxjs/toolkit';

import channelReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messagesReducer,
  },
});
