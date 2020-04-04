import React from 'react';
import { useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';

export const SelectedCounting = (props) => {
    const { resource } = props;
    const translate = useTranslate();
    const selectedIds = useSelector((state) => state.admin.resources[resource].list.selectedIds);
    return (
        selectedIds.length > 0
            ? (
                <div>
                    {translate('commons.message.resource_selected', {
                        resource_name: translate(`resources.${resource}.name`),
                        smart_count: selectedIds.length
                    })}
                </div>
            )
            : ''
    );
};

SelectedCounting.propTypes = {
    resource: PropTypes.string.isRequired
};
