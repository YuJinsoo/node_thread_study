"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.once('message', ({ worker2 }) => {
        (0, assert_1.default)(worker2 instanceof worker_threads_1.MessagePort);
        worker2.postMessage('message from worker1');
    });
}
