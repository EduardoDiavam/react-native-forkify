import axios from 'axios';

const api = axios.create({
    baseURL: 'https://forkify-api.herokuapp.com/api/search?q=pizza'
});

export default api;
