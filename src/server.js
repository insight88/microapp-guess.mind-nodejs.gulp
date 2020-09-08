import {
  join
} from 'path';
import express from 'express';
import socketIO from 'socket.io';
import logger from 'morgan'

// * http method는 모두 stateless (req,res 후 연결이 끊김)
// * ws(websocket)은 stateful (server와 client가 계속 연결되어 있음)
// * ws가 메모리가 많이 들지만 실시간 통신에 더 유리함
// * http와 ws 서버는 하나의 포트에 동시에 run이 가능하지만, 2개의 http나 ws가 한 포트를 사용할 수 없다

const PORT = 4000;
const app = express();
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'static')));
app.use(logger("dev"))
app.get('/', (req, res) => res.render('home'));

const handleListening = () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
}

const server = app.listen(PORT, handleListening);
const io = socketIO.listen(server);
// * socket.io는 동시에 server와 client의 역할을 둘 다 수행한다
// * socket.io가 백엔드와 프론트엔드가 서로 대화할 수 있게 만든다

let sockets = [];

io.on("connection", socket => {
  sockets.push(socket.id)
  console.log(sockets)
});