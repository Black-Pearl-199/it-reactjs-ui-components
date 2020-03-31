import { useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ProgressBarManager from './ProgressBarManager';
import { uuidv4 } from '../../utils';

export const LazyLoad = () => {
    useEffect(() => {
        const processName = uuidv4();
        ProgressBarManager.start(processName);

        return () => {
            ProgressBarManager.stop(processName);
        };
    });

    return '';
};
