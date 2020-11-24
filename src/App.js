import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Main from "./Components/Main";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppProvider } from './Utilities/AppContext'
// import AxiosHelper from "./Utilities/AxiosHelper";


function App() {
  const pages = [
    { readableName: "Signup", url: "signup" },
    { readableName: "Login", url: "login" },
    { readableName: "Main", url: "main" },
  ]


  const [currentPage, setCurrentPage] = useState(0);

  // component did update
  const setPage = (newPageNum) => {
    setCurrentPage(newPageNum)
    window.localStorage.setItem("currentPage", JSON.stringify(newPageNum))
  }

  // did mount
  useEffect(() => {
    let lSpage = window.localStorage.getItem("currentPage")
    if (lSpage !== currentPage) {
      setCurrentPage(JSON.parse(lSpage))
    }
  }, [currentPage])

  // useEffect(()=> window.localStorage.setItem("currentPage", JSON.stringify(currentPage)))

  const [token, setToken] = useState('');


  return (
    <div className="brand-main">
      <Router>
        <AppProvider value={{ token, setToken }}>

          <NavBar
            pages={pages}
            currentPage={currentPage}
            setPage={setPage}
          />

          <div class="row my-5 justify-content-center">
            <div class="col-7">
              <Switch>
                <Route path="/board">
                  <h1>THANKS!</h1>
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/main">
                  <Main />
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
