import { useEffect } from 'react';
import { uuidv4 } from '../../utils';
import ProgressBarManager from './ProgressBarManager';

const LazyLoad = () => {
    useEffect(() => {
        const processName = uuidv4();
        ProgressBarManager.getInstance().start(processName);

        return () => {
            ProgressBarManager.getInstance().stop(processName);
        };
    });

    return <></>;
};

export default LazyLoad;
