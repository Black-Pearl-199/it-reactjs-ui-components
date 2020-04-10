import React from 'react';
import { useTranslate } from 'react-admin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MyBackButton } from '../button';

export const FormHeading = (props) => {
    const {
        title, hasBack, history, basePath, children, skipTran, className
    } = props;
    const translate = useTranslate();
    return (
        <div className={classNames('d-flex flex-row flex-nowrap', className)}>
            <div className="d-flex flex-row">
                {hasBack === false ? '' : (
                    <>
                        <div className="my-auto"><MyBackButton history={history} basePath={basePath} /></div>
                        &nbsp;&nbsp;
                    </>
                )}
                <h3 className="my-0">{skipTran ? title : translate(title)}</h3>
            </div>
            <div className="d-flex flex-row-reverse ml-auto">
                {children}
            </div>
        </div>
    );
};

FormHeading.propTypes = {
    title: PropTypes.string,
    history: PropTypes.object,
    basePath: PropTypes.string,
    skipTran: PropTypes.bool,
    hasBack: PropTypes.bool
};
