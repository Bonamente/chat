import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

import axios from 'axios';
import routes from '../routes.js';

const getNormalized = (data) => {
  const channel = new schema.Entity('channels');
  const message = new schema.Entity('messages');

  const normalizedData = normalize(data, {
    channels: [channel],
    messages: [message],
  });

  return normalizedData;
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return getNormalized(data);
  },
);

export default fetchData;
