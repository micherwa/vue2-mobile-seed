import Vue from 'vue';

export default {
    /**
    * 获得user列表
    */
    userList (option = {}) {
        return Vue.http.get('/mock/userList', { params: option });
    }
};
