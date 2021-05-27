import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useTranslate } from 'react-admin';
import { searchInDataTable } from '../../utils';
import { MyExportExcelButton } from '../button';
import { tableStyles } from '../MyCustomStyles';
import MyDatagrid from './MyDatagrid';

const useStyles = makeStyles(tableStyles);
// const useStyleWidth = makeStyles({
//     width99: {
//         width: 'calc(100% - 1px) !important'
//     }
// });

const MySearchableDataGrid = (props) => {
    const classes = useStyles();
    // const styleWidth = useStyleWidth();
    const [textSearch, setTextSearch] = useState('');
    const translate = useTranslate();
    const [maxHeightTable, setMaxHeightTable] = useState();

    const onSearch = (e) => {
        setTextSearch(e.currentTarget.value);
    };

    const {
        data,
        ids,
        searchEnable,
        exportable,
        exporter,
        customAction,
        innerScroll,
        customTableClasses = classes,
        height,
        hasCustomAction,
        customSearchDatagridClass,
        ...rest
    } = props;
    // const {translate} = this.props;

    useEffect(() => {
        // eslint-disable-next-line no-nested-ternary
        const scrollHeight = innerScroll ? (searchEnable || exportable || hasCustomAction ? parseInt(height, 10) - 30 : height) : '100%';
        setMaxHeightTable(scrollHeight);
    }, [innerScroll, height, searchEnable, exportable, hasCustomAction]);

    const { resource, fields } = props;
    let newData = data;
    let newIds = ids;
    if (textSearch.trim().length > 0) {
        newData = searchInDataTable(data, textSearch);
        newIds = Object.keys(newData);
        // console.log('new data after filter', newData, newIds);
    }
    // eslint-disable-next-line no-nested-ternary
    return (
        <div className={customSearchDatagridClass}>
            {/* <div className='container-fluid my-2'> */}
            <div className="d-flex flex-row-reverse">
                {exportable && (
                    <div className="ml-4">
                        <MyExportExcelButton
                            className="btn btn-itech btn-itech-primary btn-itech-fixed"
                            resource={resource}
                            exporter={exporter}
                            name={`resources.${resource}.name`}
                            fields={fields}
                            style={{ height: '30px !important' }}
                        />
                    </div>
                )}
                {customAction}
                {searchEnable ? (
                    <div className="input-group input-group-sm input-group-itech-search mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputSearchAddon">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={translate('button.search')}
                            value={textSearch}
                            aria-label="Search study"
                            aria-describedby="inputSearchAddon"
                            onChange={onSearch}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={classNames('table-responsive bordered')} style={{ maxHeight: maxHeightTable || '100%' }}>
                <MyDatagrid
                    {...rest}
                    data={newData}
                    ids={newIds}
                    classes={customTableClasses}
                    className={classNames('mb-0', 'table-striped', 'table', 'table-sm')}
                />
            </div>
            {/* </div> */}
        </div>
    );
};

MySearchableDataGrid.propTypes = {
    searchEnable: PropTypes.bool,
    exportable: PropTypes.bool,
    exporter: PropTypes.func,
    customAction: PropTypes.any,
    translate: PropTypes.func,
    data: PropTypes.object,
    ids: PropTypes.array,
    currentSort: PropTypes.object,
    filterValues: PropTypes.object,
    total: PropTypes.number,
    resource: PropTypes.string,
    fields: PropTypes.array,
    innerScroll: PropTypes.bool,
    customTableClasses: PropTypes.object,
    height: PropTypes.any, // maxHeight of List,
    hasCustomAction: PropTypes.bool,
    customSearchDatagridClass: PropTypes.string
};

MySearchableDataGrid.defaultProps = {
    searchEnable: true,
    exportable: false,
    innerScroll: true
};

export default MySearchableDataGrid;
