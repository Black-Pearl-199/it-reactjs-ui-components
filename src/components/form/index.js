import { addField } from 'ra-core';

import FormHeading from './FormHeading';
import MyBootstrapInput from './MyBootstrapInput';
import MyCheckboxInput from './MyCheckboxInput';
import MyCheckboxGroupInput from './MyCheckboxGroupInput';
import MyDatePicking from './MyDatePicking';
import MyFilterBox from './MyFilterBox';
import MyGroupingInput from './MyGroupingInput';
import MyRadioGroupInput from './MyRadioGroupInput';
import MyRadioButtonGroupInput from './MyRadioButtonGroupInput';
import MyReferenceInput from './MyReferenceInput';
import MyReferenceArrayInput from './MyReferenceArrayInput';
import MySimpleForm from './MySimpleForm';
import MySelectArrayInput from './MySelectArrayInput';

const MyBootstrapField = addField(MyBootstrapInput);

export {
    FormHeading,
    MyBootstrapField,
    MyBootstrapInput,
    MyCheckboxInput,
    MyCheckboxGroupInput,
    MyDatePicking,
    MyFilterBox,
    MyGroupingInput,
    MyRadioGroupInput,
    MyRadioButtonGroupInput,
    MyReferenceInput,
    MyReferenceArrayInput,
    MySimpleForm,
    MySelectArrayInput
};

export * from './MyCustomInput';
export * from './MyDatePicking';
