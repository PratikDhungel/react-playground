import axios from 'axios';
import { logoutUser } from '../utils/auth/logout';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(undefined, (error) => {
  console.log('Interceptor');
  if (error.response.status === 403) {
    setTimeout(() => {
      logoutUser();
    }, 1000);
  }
  return Promise.reject(error);
});

export default axiosClient;
