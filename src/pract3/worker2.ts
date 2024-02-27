// worker2.js
import assert from 'assert';
import { parentPort, MessagePort } from 'worker_threads';

if (parentPort) {
    parentPort.once('message', ({worker1}) => {
        // worker1 에 port2 넣어놨음
        assert(worker1 instanceof MessagePort);
        worker1.on('message', message => {
            console.log('worker2 received message: %o', message)
    });
})}