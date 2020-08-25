import { memoize } from 'lodash';

class Guardian {
    static instance = null;

    static getInstance = () => {
        if (!this.instance) {
            this.instance = new Guardian();
        }
        return this.instance;
    };

    constructor() {
        this.authorities = null;
        this.masterAuthority = null;
    }

    setAuthorities = (authorities) => {
        this.authorities = authorities;

        // reset cache memoize
        this.hasAuthority.cache.clear();
        this.hasAnyAuthorities.cache.clear();
    };

    setMasterAuthority = (masterAuthority) => {
        this.masterAuthority = masterAuthority;
    };

    hasAuthority = memoize((allowedAuthority) => {
        if (!this.authorities) return false;
        if (!allowedAuthority || (this.masterAuthority && this.authorities.indexOf(this.masterAuthority) > -1)) return true;
        return this.authorities.indexOf(allowedAuthority) > -1;
    });

    hasAnyAuthorities = memoize((allowedAuthorities) => {
        if (!this.authorities) return false;
        if (!allowedAuthorities || (this.masterAuthority && this.authorities.indexOf(this.masterAuthority) > -1)) return true;
        for (let i = 0; i < allowedAuthorities.length; i += 1) if (this.hasAuthority(allowedAuthorities[i])) return true;
        return false;
    });

    hasAuthorityExcludeMaster = memoize((allowedAuthority) => {
        if (!this.authorities) return false;
        if (!allowedAuthority) return true;
        return this.authorities.indexOf(allowedAuthority) > -1;
    });

    hasAnyAuthoritiesExcludeMaster = memoize((allowedAuthorities) => {
        if (!this.authorities) return false;
        if (!allowedAuthorities) return true;
        for (let i = 0; i < allowedAuthorities.length; i += 1) if (this.hasAuthority(allowedAuthorities[i])) return true;
        return false;
    });
}

Guardian.getInstance();

export default Guardian;
