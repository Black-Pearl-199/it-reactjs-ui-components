import get from 'lodash/get';
import moment from 'moment';

export const AgeField = (props) => {
    const { record = {}, source } = props;
    const value = source ? get(record, source) : record;

    const birthDate = moment(value);

    return birthDate.isValid() ? moment().diff(birthDate, 'years') : '';
};
