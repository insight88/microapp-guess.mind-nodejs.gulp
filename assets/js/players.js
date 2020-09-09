import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas,
} from './paint';
import { disableChat, enableChat } from './chat';

const board = document.getElementById('jsPBoard');
const notifs = document.getElementById('jsNotifs');

const addPlayers = (players) => {
  board.innerHTML = '';
  players.forEach((player) => {
    const playerElement = document.createElement('span');
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = (text) => {
  notifs.innerText = '';
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  setNotifs('Guess Word!');
  disableCanvas();
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerHTML = `<span>You are the leader.</span><span class="keyword"> Draw ${word}</span>`;
};

export const handleGameEnded = () => {
  setNotifs('Game Ended.');
  disableCanvas();
  hideControls();
  resetCanvas();
  enableChat();
};

export const handleGameStarting = () => {
  setNotifs('Game will start soon');
};
