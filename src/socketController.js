import events from './events';

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    broadcast(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
  });
};
// * {nickname} 유저가 setNickname 이벤트를 발생시키면
// * 그 socket의 nickname으로 설정하고 newUser라는 이벤트를 다른 유저들에게 전달(broadcast)

export default socketController;
