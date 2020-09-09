// ! server.js와 static 폴더는 server측 소스
// ! assets 폴더는 client측 소스

import { join } from 'path';
import express from 'express';
import socketIO from 'socket.io';
import logger from 'morgan';
// * 콘솔에 나오는 GET /  200 51.267 ms - 1539 같은 로그가 나오는 미들웨어
import socketController from './socketController';
import events from './events';

// * http method는 모두 stateless (req,res 후 연결이 끊김)
// * ws(websocket)은 stateful (server와 client가 계속 연결되어 있음)
// * ws가 메모리가 많이 들지만 실시간 통신에 더 유리함
// * http와 ws 서버는 하나의 포트에 동시에 run이 가능하지만, 2개의 http나 ws가 한 포트를 사용할 수 없다

const PORT = 4000;
const app = express();
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'static')));
app.use(logger('dev'));
app.get('/', (req, res) =>
  res.render('home', {
    events: JSON.stringify(events),
  })
);
const handleListening = () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);
// * socket.io는 동시에 server와 client의 역할을 둘 다 수행한다
// * socket.io가 백엔드와 프론트엔드가 서로 대화할 수 있게 만든다

// io.on("connection", socket => {
//   socket.on("newMessage", ({
// * socket.on(event, data) : socket이 event를 listening하고 있다는 뜻
//   message
// }) => {
//   socket.broadcast.emit("messageNotif", {
// * socket.emit(event, data) : socket이 event를 발생시킨다는 뜻
// * 한 socket에서 newMessage 이벤트 발생 시, 다른 소켓들에게 messageNotif 이벤트를 broadcast
//       message,
//       nickname: socket.nickname || "Unknown"
//     });
//   });
//   socket.on("setNickname", ({
//     nickname,
//   }) => {
//     socket.nickname = nickname;
//   });
// });
// * io는 socket.io 패키지를 import한 변수, listening하고 있는 서버
// * socket은 커넥션이 성공했을 때 커넥션에 대한 정보를 담고 있는 변수

io.on('connection', (socket) => socketController(socket));
