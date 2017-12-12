import axios from 'axios';

export default {
    /**
    * 获得user列表
    */
    userList (option = {}) {
        return axios.get('/mock/userList', { params: option });
    }
};
