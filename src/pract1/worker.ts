import { threadId, parentPort } from 'worker_threads';


/** @jobSize number */
parentPort?.on('message', ({jobSize, threadId, testStr}) => {
    console.time(`${threadId} thread`);
    let result = doSomething(jobSize);
    console.timeEnd(`${threadId} thread`);
    let result_str = testStr + 'done'

    // INFO: 메인스레드에 데이터 전달
    parentPort?.postMessage({result, threadId, result_str});

    // INFO: parentPort 이벤트를 종료시켜줘야함
    // 워커스레드 종료라고 메인스레드에 알려줘야 exit이벤트 발생
    parentPort?.close();
});

function doSomething(jobSize: number): number{
    let data: number = 0;
    for (let i = 0; i < jobSize; i++){
        data += 1;
    }
    return data;
}