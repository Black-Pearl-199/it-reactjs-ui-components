import { USER_LOGIN_SUCCESS } from 'react-admin';

// eslint-disable-next-line camelcase
export const userLoginSuccess = (itech_user) => {
    console.log('userLoginSuccess', itech_user);
    return {
        type: USER_LOGIN_SUCCESS,
        payload: itech_user
    };
};
