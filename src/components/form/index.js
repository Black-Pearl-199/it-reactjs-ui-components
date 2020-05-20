import { addField } from 'react-admin';

import _FormHeading from './FormHeading';
import _MyBootstrapInput from './MyBootstrapInput';
import _MyCheckboxInput from './MyCheckboxInput';
import _MyCheckboxGroupInput from './MyCheckboxGroupInput';
import _MyDatePicking from './MyDatePicking';
import _MyFilterBox from './MyFilterBox';
import _MyGroupingInput from './MyGroupingInput';
import _MyRadioGroupInput from './MyRadioGroupInput';
import _MyRadioButtonGroupInput from './MyRadioButtonGroupInput';
import _MyReferenceInput from './MyReferenceInput';
import _MyReferenceArrayInput from './MyReferenceArrayInput';
import _MySimpleForm from './MySimpleForm';
import _MySelectArrayInput from './MySelectArrayInput';

const MyBootstrapField = addField(_MyBootstrapInput);

export {
    _FormHeading as FormHeading,
    MyBootstrapField,
    _MyBootstrapInput as MyBootstrapInput,
    _MyCheckboxInput as MyCheckboxInput,
    _MyCheckboxGroupInput as MyCheckboxGroupInput,
    _MyDatePicking as MyDatePicking,
    _MyFilterBox as MyFilterBox,
    _MyGroupingInput as MyGroupingInput,
    _MyRadioGroupInput as MyRadioGroupInput,
    _MyRadioButtonGroupInput as MyRadioButtonGroupInput,
    _MyReferenceInput as MyReferenceInput,
    _MyReferenceArrayInput as MyReferenceArrayInput,
    _MySimpleForm as MySimpleForm,
    _MySelectArrayInput as MySelectArrayInput
};

export * from './MyCustomInput';
export * from './MyDatePicking';
