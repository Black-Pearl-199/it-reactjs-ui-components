import progressBar from 'nprogress';

export class ProgressBarManager {
    static _instance;

    queue = [];

    static getInstance = () => {
        if (!ProgressBarManager._instance) {
            ProgressBarManager._instance = new ProgressBarManager();
        }
        return ProgressBarManager._instance;
    };

    start = (processName) => {
        const index = this.queue.indexOf(processName);
        if (index === -1 || processName === 'fetch') {
            // console.log('start progress bar for processName=', processName);
            this.queue.push(processName);
            if (this.queue.length === 1) progressBar.start();
        }
    };

    stop = (processName) => {
        const index = this.queue.indexOf(processName);
        if (index > -1) {
            // console.log('stop progress bar for processName=', processName);
            this.queue.splice(index, 1);
            if (this.queue.length === 0) progressBar.done();
        }
    };

    forceStop = () => {
        this.queue = [];
        progressBar.done(true);
    }
}

export default ProgressBarManager.getInstance();
