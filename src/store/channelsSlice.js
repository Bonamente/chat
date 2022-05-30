import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    removeChannel: (state, action) => {
      const { id } = action.payload;

      if (id === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }

      channelsAdapter.removeOne(state, id);
    },
    changeCurrentChannel: (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const channels = action.payload.entities.channels || {};
        channelsAdapter.addMany(state, channels);

        const { currentChannelId } = action.payload.result;
        state.currentChannelId = currentChannelId;
        state.defaultChannelId = currentChannelId;
      });
  },
});

export const {
  addChannel,
  renameChannel,
  removeChannel,
  changeCurrentChannel,
} = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
