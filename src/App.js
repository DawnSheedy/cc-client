import React, { useState } from 'react';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import openSocket from 'socket.io-client';

let socket;
let user;

function App() {

  const [auth, setAuth] = useState(false);

  function startSocketAndAuth(key) {
    socket = openSocket("http://localhost:8000");
    socket.on('connect', function () {
      console.log("connected")
      socket.emit('auth', { token: key });
    });
    socket.on('user-assignment', (data) => {
      user = data.user;
      setAuth(true);
    });
  }

  function isAuth() {
    return (auth) ? <MainPage user={user} socket={socket} /> : <LoginPage setToken={ startSocketAndAuth } />
  }
  
  return (
    <div className="App">
      {isAuth()}
    </div>
  );
}

export default App;
