// eslint-disable-next-line no-undef
const socket = io("/");
// * socket에 연결하는 명령어, 서버에서 "connection" 이벤트를 발생시킴

function sendMessage(message) {
    socket.emit("newMessage", {
        message
    });
    console.log(`You: ${message}`);
}

function setNickname(nickname) {
    socket.emit("setNickname", {
        nickname
    });
}

function handleMessageNotif(data) {
    const {
        message,
        nickname
    } = data;
    console.log(`${nickname}: ${message}`);
}

socket.on("messageNotif", handleMessageNotif);