# Guess Mind Game

* Node.js, Socket.io를 활용하여 real-time 1:1 guess mind game을 만들었습니다.

## 프로젝트 구조

![file tree](https://raw.githubusercontent.com/insight88/microapp-guess.mind-nodejs.gulp/master/capture/project-file-tree.png)

## 프로젝트 설명

* assets -> static 폴더로 gulp를 이용하여 build 합니다
* src/words.js : 퀴즈에 무작위로 제출되는 문제 단어가 Array로 저장되어 있습니다.
* src/events.js : socket.io에서 처리하는 event들이 Object로 저장되어 있습니다.
* src/socketController.js : 두 플레이어가 접속하여 발생하는 모든 event의 method가 정의되어 있습니다.

![project-flow](https://raw.githubusercontent.com/insight88/microapp-guess.mind-nodejs.gulp/master/capture/project-flow.jpg)

* 각각의 플레이어는 접속 시 username을 입력합니다
* 두 플레이어가 모두 접속하면 게임이 시작됩니다.
* 무작위로 한 플레이어가 leader로 선정되면, 그림판 메뉴와 제시어가 주어집니다.
* leader가 그림을 그리면 상대 플레이어는 chat으로 제시어를 맞춥니다.
* 정답을 맞추면 점수가 올라가고, 다음 게임이 시작되기 전까지 chatting으로 대화할 수 있습니다.
* 두 플레이어 간 모든 이벤트는 실시간으로 진행됩니다.

## 사용한 기술

*  SCSS, Pug, Gulp, Node.js, Express, Socket.io

## 배포

[Heroku](https://guarded-thicket-22522.herokuapp.com/)

## 기타 정보

### 제작 이유

* socket.io의 개념을 배우고 실시간 통신 기능 구현을 실습해보았습니다.
* Express, Pug, Gulp를 복습하였습니다. 

### 제작 기간

* 2020.09.07 ~ 2020.09.09

### 제작자

* 김기표