import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.174.165.118:3000',
});

export default api;