import { memoize } from 'lodash';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';

const getSelectedIds = memoize((resource) => (state) => (state.admin.resources[resource] ? state.admin.resources[resource].list.selectedIds : []));

const SelectedCounting = (props) => {
    const { resource } = props;
    const translate = useTranslate();
    const selectedIds = useSelector(getSelectedIds(resource));
    return selectedIds.length > 0 ? (
        <div>
            {translate('commons.message.resource_selected', {
                resource_name: translate(`resources.${resource}.name`),
                smart_count: selectedIds.length
            })}
        </div>
    ) : (
        ''
    );
};

SelectedCounting.propTypes = {
    resource: PropTypes.string.isRequired
};

export default SelectedCounting;
