import UserService from 'services/UserService';
import * as types from './types';

export async function getUsers ({ commit }, params) {
    const response = await UserService.userList(params);
    let resp = response.data || {};
    commit(types.GET_USERS, resp);
    return resp;
};
