import axios from 'axios';

const HTTP = axios.create({
  baseURL: '/api',
  timeout: 1000 * 5,
});

export default HTTP;
