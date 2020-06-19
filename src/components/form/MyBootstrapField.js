import React from 'react';
import { useInput } from 'react-admin';

import MyBootstrapInput from './MyBootstrapInput';

const MyBootstrapField = (props) => (<MyBootstrapInput {...props} {...useInput(props)} />);

export default MyBootstrapField;
