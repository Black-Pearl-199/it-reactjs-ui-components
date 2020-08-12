import { get } from 'lodash';

export default (resource) => (state) => (get(state, ['admin', 'resources', resource, 'list', 'params'], {}));
