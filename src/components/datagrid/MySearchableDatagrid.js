import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslate } from 'react-admin';

import { searchInDataTable } from '../../utils';
import { MyExportExcelButton } from '../button';
import MyCustomStyles from '../MyCustomStyles';
import MyDatagrid from './MyDatagrid';

const MySearchableDataGrid = (props) => {
    const classes = MyCustomStyles.useTableStyles();
    const [textSearch, setTextSearch] = useState('');
    const translate = useTranslate();

    const onSearch = (e) => {
        setTextSearch(e.currentTarget.value);
    };

    const { data, ids, searchEnable, exportable, exporter, customAction, ...rest } = props;
    // const {translate} = this.props;
    const { resource, fields } = props;
    let newData = data;
    let newIds = ids;
    if (textSearch.trim().length > 0) {
        newData = searchInDataTable(data, textSearch);
        newIds = Object.keys(newData);
        // console.log('new data after filter', newData, newIds);
    }

    return (
        <div>
            {/* <div className='container-fluid my-2'> */}
            <div className="d-flex flex-row-reverse">
                {exportable && (
                    <div className="ml-4">
                        <MyExportExcelButton
                            className="btn btn-itech btn-itech-primary h-75 ml-4 btn-itech-fixed"
                            resource={resource}
                            exporter={exporter}
                            name={`resources.${resource}.name`}
                            fields={fields}
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
            <div className="table-responsive">
                <MyDatagrid
                    {...rest}
                    data={newData}
                    ids={newIds}
                    classes={classes}
                    className={classNames('mb-0', 'table-striped', 'table-bordered', 'table', 'table-sm')}
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
    fields: PropTypes.array
};

MySearchableDataGrid.defaultProps = {
    searchEnable: true,
    exportable: false
};

export default MySearchableDataGrid;
