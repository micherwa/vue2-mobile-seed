import axios from 'axios';

export default {
    /**
    * 获得user列表
    */
    userList (params = {}) {
        return axios.get('/mock/userList', {params});
    }
};
