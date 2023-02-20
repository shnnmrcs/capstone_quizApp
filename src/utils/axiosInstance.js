import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: '5000',
  timeoutErrorMessage: 'Request Timeout. try after sometime',
});

axiosInstance.interceptors.request.use(
  config => {
    const updatedConfig = { ...config };
    const token = localStorage.getItem('token');
    if (token) {
      const jsonToken = JSON.parse(token);
      updatedConfig.headers.Authorization = `Bearer ${jsonToken.accessToken}`;
    }
    return updatedConfig;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error?.response?.data) {
      return Promise.reject(new Error(error.response.data));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
