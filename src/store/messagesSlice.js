/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const messages = action.payload.entities.messages || {};
        messagesAdapter.addMany(state, messages);
      })
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;

        const resultEntities = Object.values(state.entities).filter((e) => e.channelId !== id);
        messagesAdapter.setAll(state, resultEntities);
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
