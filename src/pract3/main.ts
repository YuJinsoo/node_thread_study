import path from 'path';
import {Worker, MessageChannel, workerData} from 'worker_threads';

// MessageChannel을 이용해서 워커 스레드끼리 통신할 수 있음.


// MessageChannel의 새로운 인스턴스를 생성하고, 그 결과로 나온 두 개의 포트(port)를 각각 port1과 port2에 할당
// 이렇게 하면 두 개의 워커 스레드 간에 메시지를 주고받을 수 있는 채널이 생성
const { port1, port2 } = new MessageChannel();

const worker1 = new Worker(path.join(__dirname, './worker1.js'));
const worker2 = new Worker(path.join(__dirname, './worker2.js'));

// worker1에게 worker2 키에 포트(port1, messageChannel)를 값으로 한 객체를 메시지로 전달
// 두 번째 인자로는 port1
// 이것은 port1이 worker1과 worker2 사이에서 메시지를 주고받을 수 있는 채널을 통해 사용될 수 있도록 함
// 소유권을 이동시김? port1은 이제 worker1의 소유가 되어서 main에서 어케할수가없음?
worker1.postMessage({worker2: port1}, [port1]);
worker2.postMessage({worker1: port2}, [port2]);



