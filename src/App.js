import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Profile from "./Components/Profile";
import Game from "./Components/Game";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from './Utilities/AppContext'
import AxiosHelper from "./Utilities/AxiosHelper";


function App() {
  const pages = [
    { readableName: "Main", url: "/main" },
    { readableName: "Signup", url: "/signup" },
    { readableName: "Login", url: "/login" },
    { readableName: "Profile", url: '/profile' },
    { readableName: "Logout", url: '/logout' },
  ]

  const [user, setUser] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const [characterName, setCharacterName] = useState('');

  function saveUser(res) {
    if (res.status == 200) {
      // console.log(res);
      setUser(res.data);
    }
  }

  function getUser() {
    const method = 'get';
    const route = 'getUser';

    AxiosHelper({ method, route, fun: saveUser, token })
  }

  function logoutUser() {
    console.log('logout')
    window.sessionStorage.removeItem('token')
    setToken('');
  }


  // did mount
  useEffect(() => {
    let ssToken = window.sessionStorage.getItem("token")
    if (ssToken) {
      setToken(ssToken)
    }
  }, [])

  // useEffect(()=> window.localStorage.setItem("currentPage", JSON.stringify(currentPage)))

  const [token, setToken] = useState('');
  const initialContext = {
    token, setToken, user, setUser, saveUser, getUser, pages, logoutUser,
    gamesList, setGamesList, gameId, setGameId, gameName, setGameName, characterName, setCharacterName
  };

  return (
    <div className="brand-main">
      <Router>
        <AppProvider value={initialContext}>

          <NavBar />

          <div class="row my-5 justify-content-center">
            <div class="col-7">
              <Switch>
                <Route path="/board">
                  <h1>THANKS!</h1>
                </Route>
                <Route path="/main">
                  <Main />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path={`/game/:gameid`}>
                  <Game />
                </Route>
              </Switch>
            </div>
          </div>

        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
