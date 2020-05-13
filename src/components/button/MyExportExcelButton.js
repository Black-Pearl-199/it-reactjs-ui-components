import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GetApp from '@material-ui/icons/GetApp';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { get } from 'lodash';
import * as PropTypes from 'prop-types';
import { crudGetAll, useTranslate } from 'ra-core';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../utils';

const sanitizeRestProps = ({
    basePath,
    crudGetAll,
    exporter,
    maxResults,
    resource,
    sort,
    ...rest
}) => rest;

export const MyExportExcelButton = (props) => {
    const translate = useTranslate();
    const { filter, total } = useSelector((state) => {
        let { filter } = (state.admin.resources[props.resource] && state.admin.resources[props.resource].list.params) || {};
        if (isEmpty(filter)) {
            filter = props.filter || {};
        }
        return {
            filter,
            total: (state.admin.resources[props.resource] && state.admin.resources[props.resource].list.total) || 0
        };
    });
    const dispatch = useDispatch();

    const handleClick = () => {
        const {
            exporter,
            maxResults,
            sort,
            resource,
            onClick
        } = props;
        dispatch(
            crudGetAll(
                resource,
                sort,
                filter,
                maxResults,
                ({ payload: { data } }) => (exporter
                    ? saveAsExcelConverted(
                        exporter(
                            data
                        )
                    )
                    : saveAsExcel(data))
            )
        );

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    const saveAsExcelConverted = async (data) => {
        saveAsExcel(data);
    };

    const saveAsExcel = async (data) => {
        const {
            fields, resource, extension, name
        } = props;
        const wb = new ExcelJS.Workbook();

        const ws = wb.addWorksheet(name);

        const columns = [];
        fields.map((field) => {
            const header = field.resource ? translate(`resources.${field.resource}.fields.${field.name}`) : translate(`resources.${resource}.fields.${field.name}`);
            return columns.push({
                header,
                key: field.name,
                width: 20
            });
        });
        // add header to ws
        ws.columns = columns;

        data.forEach((item) => {
            const newRow = [];
            fields.map((field) => newRow.push(get(item, field.value)));
            ws.addRow(newRow);
        });

        const buf = await wb.xlsx.writeBuffer();

        saveAs(new Blob([buf]), `${resource}.${extension}`);
    };

    const {
        label, icon, ...rest
    } = props;
    return (
        <Button
            variant="itech"
            size="sm"
            className={`${total === 0 ? 'btn-itech-secondary' : 'btn-itech-primary'} btn-itech-fixed`}
            disabled={total === 0}
            onClick={handleClick}
            {...sanitizeRestProps(rest)}
        >
            <FontAwesomeIcon icon={faDownload} />
            &ensp;
            {translate(label)}
        </Button>
    );
};

MyExportExcelButton.propTypes = {
    basePath: PropTypes.string,
    dispatch: PropTypes.func,
    exporter: PropTypes.func,
    label: PropTypes.string,
    maxResults: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.object,
    icon: PropTypes.element,
    total: PropTypes.number,
    fields: PropTypes.array.isRequired,
    extension: PropTypes.string,
    onClick: PropTypes.func,
    name: PropTypes.string,
    filter: PropTypes.object
};

MyExportExcelButton.defaultProps = {
    label: 'ra.action.exportExcel',
    maxResults: 1000,
    icon: <GetApp />,
    fields: [],
    extension: 'xlsx'
};

export default MyExportExcelButton;
