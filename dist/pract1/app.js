"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const worker_threads_1 = require("worker_threads");
// tsconfig 에 resolveJsonModule 필요
const jsonConfig = __importStar(require("./env_file.json"));
const env_config = jsonConfig;
console.log('jobSize: ', env_config.jobSize);
console.log('jobSize: ', env_config.numThreads);
console.log('jobSize: ', env_config.useThread);
const worker_path = path_1.default.join(__dirname, './worker.js');
const result_arr = new Array(env_config.numThreads + 1);
const t_resultArr = [];
const t_result_map = new Map();
let num_result_received = 0;
console.log('workerPath', worker_path);
if (env_config.useThread) {
    for (let i = 0; i < env_config.numThreads; i++) {
        let myWorker = new worker_threads_1.Worker(worker_path);
        // main thread의 데이터를 worker에서 참조하는 방법이 아니라
        // 복사하여 전달하는 방식.
        // 1. 전달할 데이터 크기가 커지면 비효율적일수 있겠구나!
        myWorker.postMessage({
            jobSize: env_config.jobSize,
            threadId: i,
            testStr: 'test'
        });
        // INFO: 스레드로부터 데이터를 받음
        myWorker.on('message', ({ result, threadId, result_str }) => {
            console.log(`${myWorker.threadId} result: ${result}`);
            // t_resultArr[i] = result; // 동기화가 안됨. 밖에서 실행하면  Thread 결과: [ <17 empty items> ]
            t_resultArr.push(result);
            t_resultArr.push(result_str);
            t_result_map.set(threadId, result); //결과를 Map에 추가
            num_result_received++;
            if (num_result_received === env_config.numThreads) {
                console.log('all results received', t_resultArr);
                console.log('all results received', t_result_map);
            }
        });
        // worker 스레드 종료 될 때 실행되는 핸들러
        // parentPort.close()가 일어나면 이벤트 발생
        myWorker.on('exit', () => {
            console.log('워커 쓰레드 종료');
        });
    }
}
else {
    console.time('main');
    for (let i = 0; i < env_config.numThreads; i++) {
        result_arr[i] = doSomething();
    }
    console.timeEnd('main');
    for (let i = 0; i < env_config.numThreads; i++) {
        console.log(`result: ${result_arr[i]}`);
    }
}
function doSomething() {
    let data = 0;
    for (let i = 0; i < env_config.jobSize; i++) {
        data += 1;
    }
    return data;
}
console.log('Thread 결과:', t_resultArr); //Thread 결과: [ <17 empty items> ]
console.log('thread 결과 map: ', t_result_map); // thread 결과 map:  Map(0) {}
// 쓰레드 생성 결과
// 8 thread: 5.762s
// 8 result: 1000000000
// 3 thread: 5.792s
// 3 result: 1000000000
// 7 thread: 5.935s
// 7 result: 1000000000
// 2 thread: 5.969s
// 2 result: 1000000000
// 13 thread: 5.821s
// 13 result: 1000000000
// 11 thread: 5.783s
// 11 result: 1000000000
// 1 thread: 5.998s
// 1 result: 1000000000
// 15 thread: 5.852s
// 15 result: 1000000000
// 14 thread: 5.842s
// 14 result: 1000000000
// 5 thread: 5.956s
// 5 result: 1000000000
// 9 thread: 5.922s
// 9 result: 1000000000
// 4 thread: 5.928s
// 6 thread: 5.970s
// 6 result: 1000000000
// 4 result: 1000000000
// 12 thread: 5.919s
// 12 result: 1000000000
// 10 thread: 5.866s
// 10 result: 1000000000
// 16 thread: 5.887s
// 16 result: 1000000000
// 쓰레드 사용 안함
// main: 1:41.930 (m:ss.mmm)
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
// result: 1000000000
