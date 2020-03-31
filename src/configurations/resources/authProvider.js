/* eslint-disable camelcase */

const appName = process.env.REACT_APP_NAME;
export const AUTH_ID = `${appName}.ai`;
export const AUTH_BASIC = `${appName}.ab`;
export const AUTH_TOKEN = `${appName}.at`;
export const AUTH_REFRESH_TOKEN = `${appName}.art`;
export const AUTH_SCOPE = `${appName}.as`;
export const AUTH_USER = `${appName}.au`;
export const AUTH_REMEMBER = `${appName}.arem`;
export const AUTH_STAFF = `${appName}.astf`;
export const AUTH_EXPIRE_IN = `${appName}.aei`;
export const MAIN_STATE = `${appName}.ms`;
export const SAVE_TEMP_DATA = `${appName}.tmpdt`;
export const AUTH_GROUP = `${appName}.gr`;

export const PERMISSIONS = {
    SYSTEM_MANAGER: 'SYSTEM_MANAGER', // Quản trị hệ thống
    DICOM_TRANSFER: 'DICOM_TRANSFER', // DICOM acquisition
    TECHNICIAN: 'TECHNICIAN', // Kỹ thuật viên
    ADMIN_DOCTOR: 'ADMIN_DOCTOR', // Lãnh đạo khoa
    RADIOLOGIST: 'RADIOLOGIST', // Bác sỹ chẩn đoán hình ảnh
    INTERN_DOCTOR: 'INTERN_DOCTOR', // Bác sỹ thực tập
    REFER_DOCTOR: 'REFER_DOCTOR' // Bác sỹ lầm sàng
};

const ALL_SAVE = [
    AUTH_GROUP,
    AUTH_ID,
    AUTH_BASIC,
    AUTH_TOKEN,
    AUTH_REMEMBER,
    AUTH_REFRESH_TOKEN,
    AUTH_SCOPE,
    AUTH_USER,
    AUTH_STAFF,
    AUTH_EXPIRE_IN,
    MAIN_STATE,
    SAVE_TEMP_DATA
];

const clearData = () => ALL_SAVE.forEach((key) => localStorage.removeItem(key));

const saveAccessTokenData = (accessTokenData, rememberLogin) => {
    const {
        access_token,
        token_type,
        refresh_token,
        scope,
        itech_user,
        expires_in
    } = accessTokenData;
    localStorage.setItem(AUTH_TOKEN, `${token_type} ${access_token}`);
    localStorage.setItem(AUTH_REFRESH_TOKEN, refresh_token);
    localStorage.setItem(AUTH_SCOPE, scope);
    localStorage.setItem(AUTH_USER, JSON.stringify(itech_user));
    localStorage.setItem(AUTH_ID, itech_user.id);
    localStorage.setItem(AUTH_STAFF, JSON.stringify(itech_user));
    if (rememberLogin !== undefined) localStorage.setItem(AUTH_REMEMBER, rememberLogin);
    localStorage.setItem(
        AUTH_EXPIRE_IN,
        expires_in * 1000 + new Date().getTime()
    );
    return itech_user;
};

let refreshing = false;

export const refreshToken = () => {
    const basicAuth = `Basic ${btoa(`${process.env.REACT_APP_USER}:${process.env.REACT_APP_PASSWORD}`)}`;
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN);
    const formData = new FormData();
    formData.append('refresh_token', refreshToken);
    formData.append('grant_type', 'refresh_token');
    const request = new Request(process.env.REACT_APP_AUTH_URL, {
        method: 'POST',
        body: formData,
        headers: new Headers({
            Authorization: `${basicAuth}`
        })
    });
    refreshing = true;
    return fetch(request)
        .then(
            (response) => {
                if (response.status < 200 || response.status >= 300) {
                    console.groupEnd();
                    throw new Error(response.statusText);
                }
                return response.json();
            },
            (error) => {
                console.error('login error', error);
                // toast.error(`Cannot login. Please try again later!`);
                console.groupEnd();
                refreshing = false;
                return Promise.reject(error);
            }
        )
        .then((accessTokenData) => {
            console.log('refresh token body', accessTokenData);
            saveAccessTokenData(accessTokenData);
            refreshing = false;
            return Promise.resolve('refresh token success');
        })
        .catch((error) => {
            refreshing = false;
            return Promise.reject(error);
        });
};

export const checkTokenExpire = () => {
    if (!refreshing) {
        return new Promise((resolve) => {
            const expireTime = parseInt(
                localStorage.getItem(AUTH_EXPIRE_IN)
            );
            const currentTime = new Date().getTime();
            const expired = isNaN(expireTime) || expireTime <= currentTime;
            console.log('check token expiration');
            console.log(expireTime - currentTime);
            resolve(expired);
        });
    }
    return new Promise((resolve) => {
        const waiter = setInterval(() => {
            if (!refreshing) {
                const expireTime = parseInt(
                    localStorage.getItem(AUTH_EXPIRE_IN)
                );
                const currentTime = new Date().getTime();
                const expired = isNaN(expireTime) || expireTime <= currentTime;
                console.log('check token expiration');
                console.log(expireTime - currentTime);
                clearInterval(waiter);
                resolve(expired);
            }
        }, 100);
    });
};

const authProvider = {
    login: (params) => {
        const { username, password, remember } = params;
        const basicAuth = `Basic ${btoa(`${process.env.REACT_APP_USER}:${process.env.REACT_APP_PASSWORD}`)}`;
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        const request = new Request(process.env.REACT_APP_AUTH_URL, {
            method: 'POST',
            body: formData,
            headers: new Headers({
                Authorization: `${basicAuth}`
            })
        });
        return fetch(request)
            .then(
                (response) => {
                    console.groupEnd();
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                },
                (error) => {
                    console.error('login error', error);
                    console.groupEnd();
                    return Promise.reject(error);
                }
            )
            .then((accessTokenData) => Promise.resolve({
                data: saveAccessTokenData(accessTokenData, remember)
            }));
    },
    logout: () => {
        clearData();
        return Promise.resolve();
    },
    checkAuth: () => (localStorage.getItem(AUTH_ID)
        ? Promise.resolve()
        : Promise.reject()),
    checkError: (params) => {
        const { message, status, body } = params;
        console.log('fetch error', message, status, body);
        return status === 500 ? Promise.reject() : Promise.resolve();
    },
    getPermissions: () => {
        const iTechUser = JSON.parse(localStorage.getItem(AUTH_USER));
        return iTechUser
            ? Promise.resolve(iTechUser['authorities'])
            : Promise.reject();
    }
};

export default authProvider;
