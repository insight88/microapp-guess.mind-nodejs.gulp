const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

const nickname = localStorage.getItem(NICKNAME);

const logIn = nickname => {
    // eslint-disable-next-line no-undef
    window.socket = io("/");
    window.socket.emit(window.events.setNickname, {
        nickname
    });
};
// * socket을 global object(variable)인 window에 넣어 globally access하게 만듬

if (nickname === null) {
    body.className = LOGGED_OUT;
} else {
    body.className = LOGGED_IN;
    logIn(nickname);
}

const handleFormSubmit = e => {
    e.preventDefault();
    const input = loginForm.querySelector("input");
    const {
        value
    } = input;
    input.value = "";
    localStorage.setItem(NICKNAME, value);
    body.className = LOGGED_IN;
    logIn(value);
};

if (loginForm) {
    loginForm.addEventListener("submit", handleFormSubmit);
}