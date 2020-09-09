// ! 유저가 발생시키는 이벤트를 감지하고, 다른 유저들에게 새로운 이벤트를 전달하는 Controller

import events from './events';
import { setInterval } from 'timers';

let sockets = [];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // * socket.broadcast.emit은 socket 자신을 제외한 client들에게만 이벤트를 emit
  const superBroadcast = (event, data) => io.emit(event, data);
  // * io.emit은 모든 client들에게 이벤트를 emit
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
  });
  // * {nickname} 유저가 setNickname 이벤트를 발생시키면
  // * 그 socket의 nickname으로 설정하고 newUser라는 이벤트를 다른 유저들에게 전달(broadcast)

  socket.on(events.disconnect, () => {
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message }) =>
    broadcast(events.newMsg, { message, nickname: socket.nickname })
  );

  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );

  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });

  socket.on(events.fill, ({ color }) => {
    broadcast(events.filled, { color });
  });
};

export default socketController;
