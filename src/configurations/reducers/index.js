import { combineReducers } from 'redux';
import staff from './staff';

export const ITECH_REDUCER = 'iTech';
export const STAFF = 'staff';

export default combineReducers({
    [STAFF]: staff
});
