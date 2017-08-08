import * as types from './types';
import * as getters from './getters';
import * as actions from './actions';

const state = {
    users: []
};
/**
* mutations
*/
const mutations = {
    [types.GET_USERS] (state, resp) {
        state.users = resp.result ? resp.result : [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
