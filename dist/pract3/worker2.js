"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// worker2.js
const assert_1 = __importDefault(require("assert"));
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.once('message', ({ worker1 }) => {
        (0, assert_1.default)(worker1 instanceof worker_threads_1.MessagePort);
        worker1.on('message', message => {
            console.log('worker2 received message: %o', message);
        });
    });
}
