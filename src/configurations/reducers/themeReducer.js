import { SWITCH_THEME } from '../actions';

const INITIAL_STATE = 'light';

export default (previousState = INITIAL_STATE, action) => {
    // console.log('themeReducer', action);
    const { type, payload } = action;
    if (type === SWITCH_THEME) {
        const type = payload.themeType === 'light' ? 'dark' : 'light';
        return type;
    } return previousState;
};
