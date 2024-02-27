import assert from 'assert';
import { parentPort, MessagePort } from 'worker_threads';


if (parentPort){

    // .once 해당 발생 이벤트에 대해 한 번만 호출될 콜백 함수를 등록하는 메서드. 
    // 다음에 같은 이벤트가 발생해도 반응하지 않음
    parentPort.once('message', ({worker2}) => {
        // worker2 키에 port1 넣어놨음
        assert(worker2 instanceof MessagePort);
        // messagePort로 값을 전달.
        worker2.postMessage('message from worker1');
    })
}