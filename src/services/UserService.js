import axios from 'axios';

export default {
    userList (params = {}) {
        return axios.get('/mock/userList', {params});
    }
};
