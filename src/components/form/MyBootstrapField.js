import React from 'react';
import { useInput } from 'react-admin';

import MyBootstrapInput from './MyBootstrapInput';

const parse = (value) => value;
const MyBootstrapField = (props) => (<MyBootstrapInput {...props} {...useInput({ ...props, parse })} />);

export default MyBootstrapField;
