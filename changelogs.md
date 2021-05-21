#Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.4.3] - 2021-05-20
### Added
- Added button-group to MyBoostrapInput - [@Triet]
- Added itech-outline button variant - [@Triet]

## [0.4.2] - 2021-05-06
### Changed
- Update dark theme - [@TinVan2]
## [0.4.1] - 2021-04-29
### Changed
- Update dark theme - [@TinVan2]
## [0.4.0] - 2021-04-28
### Changed
- Update input field layout- [@TinVan2]
- Update sidebar layout - [@TinVan2]
- Update table layout - [@TinVan2]
- Update button layout - [@TinVan2]
- Update layout of switcher theme - [@TinVan2]
## [0.3.9] - 2021-04-07
### Changed
- Support hidden option text for checkbox- [@TinVan2]
## [0.3.8] - 2020-12-17
### Added
- Added contrast color for each color variable - [@Triet]
### Changed
- Change theme color according to mockup - [@Triet]
- Add MySimpleForm into MyFilterBox for support input value management - [@TinVan2]
## [0.3.7] - 2020-12-07-8
### Changed
- Support back button in toolbar of form - [@TinVan2]
## [0.3.6] - 2020-12-04
### Fixed
- Fix css for header when scroll in table - [@TinVan2]
## [0.3.5] - 2020-12-03
### Changed
- Show border of header and fix show border of header when scroll - [@TinVan2]
## [0.3.4] - 2020-12-02
### Added
- Support double click and right click in MyList - [@TinVan2]

## [0.3.3] - 2020-11-04
### Changed
- Remove all shadows from app - [@Triet]

## [0.3.2] - 2020-11-04
### Changed
- Support hide search button in MyFilterBox - [@TinVan2]
## [0.3.1] - 2020-11-02
### Fixed
- Fixed not change perPage and page when use standalone list - [@TinVan2]
## [0.3.0] - 2020-10-12
### Changed
- Change radio button style - [@Triet]

## [0.2.99] - 2020-10-12
### Changed
- Update theme redesign: change palette color, update checkbox color - [@Triet]

## [0.2.98] - 2020-10-07
### Fixed
- Fixed disabled form not showing correct disabled color - [@Triet]

## [0.2.97] - 2020-10-07
### Added
- Add CustomThemeProvider to handle sideEffect - [@Triet]
### Changed
- Move set root properties logic from ThemeSwitcher to CustomThemeProvider - [@Triet]

## [0.2.96] - 2020-10-06
### Fixed
- Add case handle for ThemeSwitcher without switching - [@Triet]

## [0.2.95] - 2020-10-05
### Added
- Add theme reducer to store theme type - [@Triet]

## [0.2.94] - 2020-10-02
### Fixed
- Fix navbar border color - [@Triet]

## [0.2.93] - 2020-10-02
### Added
- Add ThemeSwitcher component to handle modifying root color variables - [@Triet]
### Changes
- Replace color in various element from color string to variables - [@Triet]
- Remove unused color variables in _variables.scss - [@Triet]

## [0.2.92] - 2020-10-01
### Changed
- Change backgroundColor of PagingRefInput - [@TinVan2]

## [0.2.91] - 2020-10-01
### Added
- Add paging for select referece input - [@TinVan2]

## [0.2.90] - 2020-09-29
### Changed
- Add function onChange into filterRef in MyFilterBox - [@TinVan2]
### Added
- Add parse function as props of MyBootstrapField to not ignore empty string value in form - [@TinVan2]

## [0.2.89] - 2020-09-24
### Changed
- Add condition for default state of 'disableInputDate' in MyDatePicking - [@TinVan2]
- Add condition for set currentActive in MyDatePicking - [@TinVan2]
### Added
- Support delay time option for submit in MyFilterBox - [@khanhITECH]

### 
## [0.2.88] - 2020-09-17
### Changed
- Update border style for table header - [@TinVan2]
- Support MyDatePicking for auto focus when click other date button - [@TinVan2@]

## [0.2.87] - 2020-09-16
### Changed
- Update style of table header - [@TinVan2]
- Update MyDatePicking for enable input when click other date - [@TinVan2]
- Support hide text of checkbox - [@TinVan2]

## [0.2.86] - 2020-08-31
### Changed
- Change import to reduce bundle size - [@tunglt1810]

## [0.2.85] - 2020-08-27
### Fixed
- Fix: Compute high for list have customAction, search, exporter - [@TinVan2]

## [0.2.84] - 2020-08-25
### Added
- Add funcs to support check has any authorities exclude the master authorities - [@TinVan2]

## [0.2.83] - 2020-08-25
### Added
- Add label confirm in edit toolbar - [@khanhITECH]
### Changed
- Changed default animation of MessageBox modal to false and export api property for control - [@tunglt1810]

## [0.2.82] - 2020-08-20
### Added
- MyBootstrapInput support show select time format - [@TinVan2]

## [0.2.81] - 2020-08-19
### Added
- MyControlField support access object updatable and deletable field data - [@tunglt1810]

## [0.2.80] - 2020-08-17
### Added
- MyIconButton supports skip translate popup label - [@tunglt1810]

## [0.2.79] - 2020-08-13
### Added
- MySearchableDatagrid support custom 'classes' for table - [@TinVan2]
### Changed
- Change 'showYearPicker' of datepicker for show year picker - [@TinVan2]
- Support resize many list in one page - [@TinVan2]

## [0.2.78] - 2020-08-12
### Added
- MyBootstrapInput support render children - [@tunglt1810]
### Changed
- Change style of Save and Edit toolbar to remove space - [@tunglt1810]
### Fixed
- Fixed default optionClasses for MyBootstrapInput with checkbox group type - [@tunglt1810]
- Fixed BootstrapInput type checkbox with init value - [@tunglt1810]

## [0.2.77] - 2020-08-12
### Added
- MyControlField support custom classname for edit and delete button, and custom delete notification - [@tunglt1810]
- Default delete message will notify object id - [@tunglt1810]

## [0.2.76] - 2020-08-12
### Added
- Add selector to select object of a resource by id - [@tunglt1810]
- Add selector to select list parameters of a resource - [@tunglt1810]
- Fetch progress now handle include CLEAR_STATE action - [@tunglt1810]
- Add ra-core to exclude dependencies list in webpack config - [@tunglt1810]
### Removed
- Remove check token expire in fetch side effect - [@tunglt1810]

## [0.2.75] - 2020-08-12
### Changed
- Change css table for hide horizontal scroll - [@TinVan2]

## [0.2.74] - 2020-08-07
### Added
- Add css in simple form - [@khanhITECH]
### Fixed
- Override 'id' property for checkbox-group, radio-group in MyBootstrapInput when use MyBootstrapInput in MySimpleForm - [@TinVan2]

## [0.2.73] - 2020-08-07
### Fixed
- Fix date input unchange when use typing with text - [@TinVan2]

## [0.2.72] - 2020-08-06
### Added
- Add css to support fix height of form for MyCreate and MyEdit - [@khanhITECH]
### Changed
- Change name of style definition for form -[@khanhITECH]
### Removed
- Remove custom input base on react-admin input - [@tunglt1810]

## [0.2.71] - 2020-08-03
### Added
- Update datepicker - [@khanhITECH]

## [0.2.70] - 2020-07-30
### Added
- Add StandaloneList for scroll MyStandaloneList - [@TinVan2]

## [0.2.69] - 2020-07-29
### Changed
- Change max-height of table dependencies have quick search or pagination - [@TinVan2]

## [0.2.68] - 2020-07-28
### Changed
- Change border for table - updated - [@TinVan2]

## [0.2.67] - 2020-07-28
### Changed
- Change border for table - [@TinVan2]

## [0.2.66] - 2020-07-27
### Changed
- Change padding of nav tab item - [@tunglt1810]
### Removed
- Remove transform nav tab item - [@tunglt1810]

## [0.2.65] - 2020-07-27
### Added
- MySaveToolBar and MyEditToolbar now support button custom className - [@tunglt1810]
### Removed
- Remove BooleanInput, DisabledInput, MyCustomInputGroup - [@tunglt1810]

## [0.2.64] - 2020-07-25
### Changed
- MySaveButton supports custom button label - [@tunglt1810]
- MyUpdateButton supports custom button label - [@tunglt1810]

## [0.2.63] - 2020-07-24
### Changed
- Change line-height of header table by 200% font-size - [@TinVan2]

## [0.2.62] - 2020-07-24
### Changed
- MyBootstrapInput new support handleChoiceOption if componen "select" -> have choices props - [@tunglt1810]

## [0.2.61] - 2020-07-24
### Added
- Change line-height for header of table - [@TinVan2]
- Add custom action for MyFilterBox - [@TinVan2]

## [0.2.60] - 2020-07-24
### Added
- Add radio group input to MyBootstrapInput - [@tunglt1810]
### Changed
- Replace TextField by label in ReferenceError - [@tunglt1810]
- Move FormHeading to layout - [@tunglt1810]
### Removed
- Remove MyRadioGroupInput - [@tunglt1810]

## [0.2.59] - 2020-07-23
### Added
- Add useShallowEqualSelector hook - [@tunglt1810]
- Add some redux store selector - [@tunglt1810]

## [0.2.58] - 2020-07-21
### Fixed
- Fix max height for table in MyList when page resize - [@tunglt1810]
### Changed
- Change fontSize of FormHeading - [@TinVan2]
- Change color of scrollbars-color - [@TinVan2]

## [0.2.57] - 2020-07-20
### Changed
- Change z-index of thead => zIndex = 2; - [@TinVan2]

## [0.2.56] - 2020-07-18
### Changed
- Change css of al-content to padding: 20px 10px - [@TinVan2]
- MyField: font-size: font-875rem; - [@TinVan2]
- Change padding of row in table - [@TinVan2]
### Added
- Added useMeasure for calculator height component - [@TinVan2]
- Added scroll for table with maxHeight - [@TinVan2]

## [0.2.55] - 2020-07-16
### Changed
- MyIconButton supports config tooltip placement - [@tunglt1810]

## [0.2.54] - 2020-07-16
## Fixed
- Fix toggle's prop type of SideBar - [@tunglt1810]

## [0.2.53] - 2020-07-16
### Added
- DefaultToggle component for Sidebar - [@tunglt1810]
- Add css for selected and hover text color for menu item - [@tunglt1810]
- Add style for side heading and side toggle icon - [@tunglt1810]
### Changed
- Sidebar supports custom ToggleComponent - [@tunglt1810]
- MyIconButton supports custom className - [@tunglt1810]
- Fixed css border in atomic class border - [@tunglt1810]

## [0.2.52] - 2020-07-15
### Fixed
- Fix padding of AngleUp icon of menu item which has sub items - [@tunglt1810]
### Removed
- Remove sidebar height - [@tunglt1810]

## [0.2.51] - 2020-07-15
### Changed
- Sidebar: change default scrollable to list menu item and heading still visible on top - [@tunglt1810]
- reduce menu item height - [@tunglt1810]
### Added
- add atomic css class for scroll bar: size, color - [@tunglt1810]
- add sidebar heading class - [@tunglt1810]
### Removed
- sidebar menu item: remove default uppercase - [@tunglt1810]

## [0.2.50] - 2020-07-14
### Changed
- changed styles of sidebar to support scroll inside list of items - [@tunglt1810]

## [0.2.49] - 2020-07-13
### Changed
- Sidebar: support custom action from menu item config - [@tunglt1810]
- listStylesNoActionsList: overflow attribute of content is now fixed hidden - [@tunglt1810]
- Replace scss variables by css variable for custom theme css - [@TinVan2] 

## [0.2.48] - 2020-07-13
### Changed
- LanguageSwitcher: change render title for synchronize style - [@TinVan2]

## [0.2.47] - 2020-07-13
### Changed
- LanguageSwitcher: change render title for synchronize style - [@tunglt1810]

## [0.2.46] - 2020-07-10
### Changed
- change size = 'sm' for RevertEditButton and move change order of RevertEditButton and customButotn - [@TinVan2]
### Fixed
- Fix display values of MySelectArrayInpu - [@TinVan2]
- Change display of LanguageSwitcher - support display icon -[@TinVan2]

## [0.2.45] - 2020-07-10
### Added
- Add MyStandaloneList: render list and control query param by local state and does not interact with search on url - [@khanhITECH] 
### Changed
- change datagrid folder to list - [@khanhITECH]

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
