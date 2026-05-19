import axios from 'axios';

const portalInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default portalInstance;
