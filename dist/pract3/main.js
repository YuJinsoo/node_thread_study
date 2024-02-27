"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
const { port1, port2 } = new worker_threads_1.MessageChannel();
const worker1 = new worker_threads_1.Worker(path_1.default.join(__dirname, './worker1.js'));
const worker2 = new worker_threads_1.Worker(path_1.default.join(__dirname, './worker2.js'));
worker1.postMessage({ worker2: port1 }, [port1]);
worker2.postMessage({ worker1: port2 }, [port2]);
