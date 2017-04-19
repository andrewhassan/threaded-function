// @flow
import ThreadedFunction from '../dist/ThreadedFunction';

function addOne(a: number): number {
    return a + 1;
}
const threadedAddOne = new ThreadedFunction(addOne);
threadedAddOne.execute(1)
.then(result => {
    console.log(result);
});

function longRunning(a: number): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + 123);
        }, 1000);
    });
}

const threadedLongRunning = new ThreadedFunction(longRunning);
threadedLongRunning.execute(1234)
.then(result => {
    console.log(result);
});

const test = new ThreadedFunction(() => {
    console.log('this is running in a threaded anonymous function');
});
test.execute();

function error() {
    throw new Error('this is an error!');
}
const threadedError = new ThreadedFunction(error);
threadedError.execute()
.catch(error => {
    console.log('Yay, we caught an expected error:', error);
});

function rejection() {
    return Promise.reject(new Error('Promise rejection error'));
}
const threadedPromiseRejection = new ThreadedFunction(rejection);
threadedPromiseRejection.execute()
.catch(error => {
    console.log('Yay, we caught an expected error:', error);
});

const x = 123;
function nonPureFunction(a: number) {
    return x + a;
}
const nonPure = new ThreadedFunction(nonPureFunction);
nonPure.execute(1)
.then(result => {
    console.error('We should not receive a result for this function');
}, error => {
    console.log('Yay, we caught an expected error:', error);
});

function concurrent(val: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(val);
        }, 2000);
    });
}
const threadedConcurrent = new ThreadedFunction(concurrent);
threadedConcurrent.execute(1).then(val => { console.log('this should be true,', val === 1); });
threadedConcurrent.execute(2).then(val => { console.log('this should be true,', val === 2); });
threadedConcurrent.execute(3).then(val => { console.log('this should be true,', val === 3); });
threadedConcurrent.execute(4).then(val => { console.log('this should be true,', val === 4); });
threadedConcurrent.execute(5).then(val => { console.log('this should be true,', val === 5); });
