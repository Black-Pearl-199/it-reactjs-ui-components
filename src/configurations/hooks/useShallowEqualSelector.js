import { shallowEqual, useSelector } from 'react-redux';

export default (selector) => useSelector(selector, shallowEqual);
