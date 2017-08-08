import UserService from 'services/UserService';
import * as types from './types';

export async function getUsers ({ commit }, [_start, _limit]) {
    const response = await UserService.userList({ _start, _limit });
    let result = response.json() || {};
    console.log(response);
    commit(types.GET_USERS, result);
    return result;
};
