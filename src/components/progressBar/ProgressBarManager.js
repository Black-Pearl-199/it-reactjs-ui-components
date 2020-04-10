import ProgressBar from 'nprogress';

export default class ProgressBarManager {
    static instance

    queue = [];

    static getInstance = () => {
        if (!ProgressBarManager.instance) {
            ProgressBarManager.instance = new ProgressBarManager();
        }
        return ProgressBarManager.instance;
    };

    start = (processName) => {
        const index = this.queue.indexOf(processName);
        if (index === -1 || processName === 'fetch') {
            // console.log('start progress bar for processName=', processName);
            this.queue.push(processName);
            if (this.queue.length === 1) ProgressBar.start();
        }
    };

    stop = (processName) => {
        const index = this.queue.indexOf(processName);
        if (index > -1) {
            // console.log('stop progress bar for processName=', processName);
            this.queue.splice(index, 1);
            if (this.queue.length === 0) ProgressBar.done();
        }
    };

    forceStop = () => {
        this.queue = [];
        ProgressBar.done(true);
    }
}
