import {
    shape,
    string,
    func,
    number,
    objectOf,
    any
} from 'prop-types';

export const recordFormPropTypes = shape({
    registeredFields: any,
    values: any,
    initial: any,
    fields: any
});

export const historyPropTypes = shape({
    action: string,
    go: func,
    goBack: func,
    goForward: func,
    length: number,
    location: shape({
        hash: string,
        key: string,
        pathname: string,
        search: string
    }),
    push: func,
    replace: func
});

export const classesPropTypes = objectOf(any);
