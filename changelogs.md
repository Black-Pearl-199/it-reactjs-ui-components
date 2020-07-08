#Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.2.44] - 2020-07-08
### Fixed
- Fix styles for List margin top when has item selected - [@tunglt1810]

## [0.2.43] - 2020-07-08
### Fixed
- MyIconButton: fix warning when disable tooltip - [@tunglt1810]

## [0.2.42] - 2020-07-07
### Removed
- Removed unused css - [@tunglt1810]
### Added
- Datagrid support check row can toggle-able - [@tunglt1810]

## [0.2.41] - 2020-07-04
### Changed
- Change main-color, main-color-hover - [@TinVan2]
- Change width of Sidebar, sidebar-width -> 240px, sidebar-width-collapse: 30px, distance between icon and text sidebar-item-pad-left: 8px; - [@TinVan2]
- Change css of button delete - [@TinVan2]
- Change 'Sửa' -> 'Thay đổi' - [@khanhITECH]
### Fixed
- Fix enableTooltip in MyControlField - [@khanhITECH]

## [0.2.39] - 2020-07-02
### Added
- Add enableTooltip in MyControlField - [@khanhITECH]
- Css: add css for flex box item support same size and border radius shorthand class - [@tunglt1810]
- Messages: add label for save as button - [@tunglt1810]

## [0.2.38] - 2020-07-02
### Changed
- Change exact in SideBar and add icon for subMenu - [@TinVan2]

## [0.2.37] - 2020-07-01
### Changed
- Change type of title in FormHeading - [@TinVan2]
- Change size of MessageBox - [@TinVan2]

## [0.2.36] - 2020-06-29
### Added
- MyReferenceInput support init form data for MyFilterBox after fetch data - [@tunglt1810]
- MyReferenceArrayInput : change new basecode same like MyReferenceInput - [@tunglt1810]

## [0.2.35] - 2020-06-29
### Added
- MyBootstrapInput support get full selected option data in select input by added handleChoiceOption prop - [@tunglt1810]

## [0.2.34] - 2020-06-25
### Removed
- remove react-router-redux from dependencies list - [@tunglt1810]

## [0.2.33] - 2020-06-24
### Changed
- RedirectCreateButton: change default label - [@TinVan2]
- MyGroupingInput: pass form prop to children - [@tunglt1810]

## [0.2.32] - 2020-06-24
### Added
- Add MyList, MyCreate, MyEdit with custom styles for List, Edit, Create component of react-admin - [@tunglt1810]

## [0.2.31] - 2020-06-24
### Changed
- _buttons.scss : support btn-pick-date button same size in MyDatePicking - [@tunglt1810]
- MyFilterBox: now support update filter for array of resource, but only use the first resource to init filter data - [@tunglt1810]

## [0.2.30] - 2020-06-23
### Removed
- createAdminStore: now remove attach store to global window api - [@tunglt1810]

## [0.2.29] - 2020-06-22
### Added
- MyReferenceInput: remove default input prop to support useInput hook in children input - [@tunglt1810]
- MyGroupingInput: support pass form input prop to children input - [@tunglt1810]

## [0.2.28] - 2020-06-19
### Changed
- MyDeleteButton: remove default className px-3 and support className props - [@tunglt1810]
- InputWrapper: moved out from MyCustomInput - [@tunglt1810]
- DateRange: moved out from MyDatePicking - [@tunglt1810]
- MyReferenceInput: remove required translate prop - [@tunglt1810]
### Removed
- MyEditToolBar: remove default className px-3 - [@tunglt1810]
- MySaveToolBar: remove default className px-3 - [@tunglt1810]

## [0.2.27] - 2020-06-19
### Added
- MyBootstrapInput support render label required - [@tunglt1810]
### Changed
- MyBootstrapField: new component render method using useInput hook from react-admin - [@tunglt1810]
- MyUpdateButton, MySaveButton: change notification type to 'info' - [@tunglt1810]
### Fixed
- MessageBox: remove const prop of action button - [@tunglt1810]

## [0.2.26] - 2020-06-18
### Changed
- Export name of some custom styles - [@tunglt1810]

## [0.2.25] - 2020-06-18
### Removed
- Remove unused components: DeleteBox, MyDeleteButton - [@tunglt1810]
### Changed
- Change css for SaveButton, MyDeleteBox - [@TinVan2]
- Replace Button from material-ui by react-bootstrap - [@TinVan2]
- Change MyDeleteButton modal show input reason to show notification confirm - [@tunglt1810]
- Change name of MyDeleteBox to MyDeleteButton - [@tunglt1810]

## [0.2.24] - 2020-06-18
### Changed
- Change css for RedirectCreateButton when text is long - [@TinVan2]

## [0.2.23] - 2020-06-17
### Changed
- Change labelDisplay of MyCheckboxInput and MyCheckboxGroupInput when has "hideLabel" - [@TinVan2]
- Change groupClasses of checkbox-group of MyBootstrapInput - [@TinVan2]

## [0.2.22] - 2020-06-16
### Changed
- Change classNames of RedirectCreateButton - [@tunglt1810]

## [0.2.21] - 2020-06-16
### Changed
- Change import icon from font awesome icon in some button - [@tunglt1810]
- Remove default render icon in RedirectCreateButton - [@tunglt1810]
- Change render icon on MyFilterBox base on icon prop - [@tunglt1810]
- Change css btn-itech-dark, effect on RedirectCreateButton and MessageBox - [@tunglt1810]
