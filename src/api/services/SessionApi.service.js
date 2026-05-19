import axios from '../axiosInstance.js';

export const createSession = (formData) => {
  return axios.post('/login', formData);
};