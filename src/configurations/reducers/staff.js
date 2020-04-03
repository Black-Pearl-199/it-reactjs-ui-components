import { USER_LOGIN_SUCCESS, USER_LOGOUT } from 'ra-core';
import { isEmpty } from 'lodash';

const appName = process.env.REACT_APP_NAME;
const AUTH_STAFF = `${appName}.astf`;

const initialState = JSON.parse(localStorage.getItem(AUTH_STAFF)) || {};

export default (previousState = initialState, action) => {
    const { type, payload } = action;
    if (type === USER_LOGIN_SUCCESS) {
        console.log('user login success', previousState, action);
        const { data } = payload;
        return isEmpty(data) ? previousState : data;
    } if (type === USER_LOGOUT) {
        return {};
    }
    return previousState;
};
