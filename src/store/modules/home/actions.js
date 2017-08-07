import UserService from 'services/UserService';
import * as types from './types';

export async function getUsers ({ commit }, params) {
    const response = await UserService.userList(params);
    console.log(response);
    let result = response.json().result || {};
    console.log(result);
    commit(types.GET_USERS, result);
    return result;
};
