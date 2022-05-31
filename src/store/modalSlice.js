import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  isOpen: false,
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { type, data } = action.payload;
      state.type = type;
      state.isOpen = true;
      state.data = data;
    },
    hideModal: (state) => {
      state.type = null;
      state.isOpen = false;
      state.data = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
