import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloud-2lxn.onrender.com',
});

export default api;