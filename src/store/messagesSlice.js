import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const messages = action.payload.entities.messages || {};
        messagesAdapter.addMany(state, messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
