# Binggo game server 2019
&nbsp;
[ONLINE DEMO(Heroku)](https://bingo2019.herokuapp.com/) 

### 00. Preparations for the project
Do process with:
- node.js
- yarn
- github auth api

### 01. How to execute

##### A. Command
```
# In your console.
$> yarn install
$> yarn start
```
##### B. Test entry point
`https://localhost:9080` is the entry point which points `./test/simpleClient.html`.

### 10. Api list

Implementations are in process. 

Conventions
- `valueName[valueType=defaultValue]`
- `*` means required value

| API | method | parameters | returns | description | status |
|-----| -----|-----|-----|-----|-----|
| member/join | POST | none | JSON object | Connects with the github account | On working |
| game/create | POST | rows[number=3], max[number=12], winRows[number=3] | JSON object | Generates A game and returns Game ID | On working |
| game/join | POST | *gameId[string] | JSON object | none | On working |
| game/commit | POST | *gameId[string], *number[number] | JSON object | Applies a number | On working | 
| game/leave | GET | *gameId[string] | JSON object | Removes the user from the game | On working | 


### 95. Cautions

##### A. `fetch` and `body-parser`
Manipulating `mode` parameter could block the `body` parameter. (In my case, I was set it to `no-cors` and post body never reached to backend)
[The official guide of `gard` section of `fetch`](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95#%EA%B0%80%EB%93%9C) 


### 96. In-game items concept
- Mix other players board
- Skip a specific player's turn 

### 97. Preparation for login
- Add github app and regiter secret info to `.env` file like below
```
$> vim .env

# File Content
CLIENT_ID=414837aae3ce93e787fd
CLIENT_SECRET=d8f4fa9f8c1cadd23383186fa7fe741c4d0878d7
HOST=http://localhost:9080
```

### 98. Prior knowledge
- [ socket.io ](https://socket.io/docs/)

### 99. Useful references
- [ Express & Socket.io join - Korean ](https://poiemaweb.com/nodejs-socketio)
- [ WebSocket & HTTP2 SSE - Korean ](https://engineering.huiseoul.com/자바스크립트는-어떻게-작동하는가-웹소켓-및-http-2-sse-1ccde9f9dc51)
- [ Github login API & node.js - English ](http://shiya.io/how-to-do-3-legged-oauth-with-github-a-general-guide-by-example-with-node-js/)
- [ About github contribution graph - English, Official ](https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile/)
