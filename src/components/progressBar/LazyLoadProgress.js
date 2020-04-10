import { useEffect } from 'react';
import ProgressBarManager from './ProgressBarManager';
import { uuidv4 } from '../../utils';

const LazyLoad = () => {
    useEffect(() => {
        const processName = uuidv4();
        ProgressBarManager.start(processName);

        return () => {
            ProgressBarManager.stop(processName);
        };
    });

    return '';
};

export default LazyLoad;
