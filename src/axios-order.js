import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-app-afb45.firebaseio.com/'});

export default instance;