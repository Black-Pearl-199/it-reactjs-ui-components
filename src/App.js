import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {
    TranslationProvider,
    DataProviderContext,
    AuthContext,
    Resource
} from 'react-admin';
import { createBrowserHistory } from 'history';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import {
    createGenerateClassName,
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import { JssProvider } from 'react-jss';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import authProvider from './configurations/resources/authProvider';
import dataProvider from './configurations/resources/iTechDataProvider';

import variables from './assets/scss/abstracts/_variables.scss';
import { index } from './configurations/messages';

import NoAccess from './pages/noAccess/NoAccess';
import { createAdminStore } from './configurations/createAdminStore';

import version from './version';
import ITechReducers, { ITECH_REDUCER } from './configurations/reducers';
import customSideEffect from './configurations/sideEffects';
import { MessageBox } from './components';
import { RESOURCES } from './configurations/resources';

const i18nProvider = polyglotI18nProvider((locale) => index[locale], 'vi');
const history = createBrowserHistory();
const customReducer = {
    [ITECH_REDUCER]: ITechReducers
};

const adminStore = createAdminStore({
    authProvider,
    dataProvider,
    history,
    customReducer,
    customSideEffect
});

const iTechTheme = createMuiTheme({
    palette: {
        primary: {
            light: variables.primaryBgColorHover,
            main: variables.primaryBgColor,
            dark: variables.primaryBgDark,
            contrastText: variables.primaryTextColor
        },
        secondary: {
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000'
        }
    },
    typography: {
        useNextVariants: true
    }
});

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'c'
});

const App = () => (
    <JssProvider generateClassName={generateClassName}>
        <Provider store={adminStore}>
            <AuthContext.Provider value={authProvider}>
                <DataProviderContext.Provider value={dataProvider}>
                    <TranslationProvider i18nProvider={i18nProvider}>
                        <MuiThemeProvider theme={iTechTheme}>
                            <ConnectedRouter history={history}>
                                <>
                                    {RESOURCES.map((resource) => (
                                        <Resource
                                            intent="registration"
                                            name={resource}
                                            options={{}}
                                            key={resource}
                                        />
                                    ))}
                                    <Switch>
                                        <Route
                                            exact
                                            path="/login"
                                            component={Login}
                                        />
                                        <Route
                                            exact
                                            path="/no-access"
                                            component={NoAccess}
                                        />
                                        <Route path="/" component={Main} />
                                    </Switch>
                                    <MessageBox />
                                    <div className="version">
                                        {`v${version}${process.env.REACT_APP_ENV}`}
                                    </div>
                                </>
                            </ConnectedRouter>
                        </MuiThemeProvider>
                    </TranslationProvider>
                </DataProviderContext.Provider>
            </AuthContext.Provider>
        </Provider>
    </JssProvider>
);

export default App;
