import { Worker, isMainThread, parentPort } from 'worker_threads';


// 메인 스레드이면 Ture, 아니면 False
if (isMainThread) {
    const worker = new Worker(__filename); // 현재 스크립트 실행 위치와 같은dir 폴더에 워커 생성
    // new Worker(code, {eval: true}) 
    // 워커를 시작하는 두 가지 메인 방법입니다(파일명을 넘기거나, 실행하고자 하는 코드를 작성하거나). 실제 제작시 파일명을 사용하는 편이 권장됩니다.

    worker.on('message', (value) => {
        console.log('워커로부터', value);
    });
    worker.on('exit', (value) => {
        console.log('워커 종료');
    });

    worker.postMessage('ping'); // 워커 스레드에 'ping'이라는 값을 전달

} else {
    // isMainThread에 의해 워커 스레드 영역이 됨.
    // 위에서 생성한 worker는 이 영역에서 동작

    if (parentPort){
        parentPort.on('message', (value) => {
            console.log('부모로부터', value);
            parentPort?.postMessage('pong'); // main 스레드로 'pong'이라는 문자열 전달
            parentPort?.close(); // 워커 스레드 종료라는 것을 main 스레드에 알려야 exit 이벤트 발생
        })
    }
}

// 기본 출력
// 부모로부터 ping
// 워커로부터 pong
// 워커 종료