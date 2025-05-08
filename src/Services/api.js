import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloud-backend-4.onrender.com',
});

export default api;