import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    return axios.get('/api/current_user');
}