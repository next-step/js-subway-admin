const { default: axios } = require('axios');

const customAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

customAxios.defaults.headers.post['Content-Type'] = 'application/json';

export default customAxios;
