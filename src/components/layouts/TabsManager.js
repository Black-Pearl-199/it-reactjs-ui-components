class TabsManager {
    static _instance;

    constructor() {
        this.map = new Map();
    }

    /**
     *  Register a context of a Component
     *  @param {String} context - context name
     *  @param {React.Component} component - Component instance
     */
    register = (context, component) => {
        this.map.set(context, component);
    };

    /**
     *  Unregister a context of a Component
     *  @param {String} context - context name
     */
    unregister = (context) => {
        this.map.delete(context);
    };

    /**
     *  Get a Component from context name
     *  @param {String} context - context name
     *  @return {React.Component} component named by context
     */
    getContext = (context) => this.map.get(context);

    /**
     *  Add a new tab to a context
     *  @param {String} context - context name
     *  @param {Object} tabData - data for the new tab
     */
    addTab = (context, tabData) => {
        // console.log('add tab for context', context, tabData);
        this.getContext(context).addTab(tabData);
    };

    /**
     *  Add a new tab to a context
     *  @param {String} context - context name
     *  @param {Object} tabData - data for the new tab
     */
    updateTab = (context, tabData) => {
        // console.log('add tab for context', context, tabData);
        this.getContext(context).updateTab(tabData);
    };

    /**
     *  Remove a tab from a context with tabKey
     *  @param {String} context - context name
     *  @param {String} tabKey - tabKey of tab need to be close
     */
    closeTab = (context, tabKey) => {
        this.getContext(context).closeTab(tabKey);
    };

    /**
     *  Select a tab from a context with tabKey
     *  @param {String} context - context name
     *  @param {String} tabKey - tabKey of tab need to be close
     */
    tabSelect = (context, tabKey) => {
        this.getContext(context).tabSelect(tabKey);
    };

    /**
     *  Select a tab from a context with tabKey
     *  @param {String} context - context name
     *  @param {String} tabKey - tabKey of tab need to be close
     */
    tabClick = (context, tabKey) => {
        this.getContext(context).tabClick(tabKey);
    };

    /**
     *  Select a tab from a context with tabKey
     *  @param {String} context - context name
     *  @param {String} tabKey - tabKey of tab need to be replace
     *  @param {Object} newTabData - new tab to replace
     */
    replaceTab = (context, tabKey, newTabData) => {
        this.getContext(context).replaceTab(tabKey, newTabData);
    };

    /**
     *  Get current TabsManager instance
     *  @return {TabsManager} current instance
     */
    static getInstance = () => {
        if (!TabsManager._instance) {
            TabsManager._instance = new TabsManager();
        }
        return TabsManager._instance;
    }
}

export default TabsManager.getInstance();
export const TAB_CONTEXT_MAIN = 'main';
