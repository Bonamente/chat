import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // reducers: {

  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const channels = action.payload.entities.channels || {};
        channelsAdapter.addMany(state, channels);

        const { currentChannelId } = action.payload.result;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
