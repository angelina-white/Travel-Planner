import './App.css';
import Home from "./Components/Home"
import HomeLogin from "./Components/HomeLogin"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [vacationList, setVacationList] = useState([]);

  useEffect(() =>
  {
    fetch('/auth')
    .then(res => 
    {
      if(res.ok)
      {
        res.json().then(user => 
        {
          setCurrentUser(user)

          fetch(`/users/${user.id}/vacations`)
          .then(resp => resp.json())
          .then(data => setVacationList(data))
        })
      }
    })
  }, [])

  function renderLists()
  {
    console.log("hi")
  }


  if(!currentUser) return <HomeLogin setCurrentUser = {setCurrentUser} renderLists={ renderLists }/>

  //logs user out
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setCurrentUser(""));
  }


  return (
    <div className="App">
      <Router>
        <div id="navbar">
          <h1>Travel Planner</h1>
          <nav>
            <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
            </ul>
          </nav>
        </div>
        <div id="appRight">
          <div>
            <p>username</p>
            <button id="logoutButton" onClick={ handleLogout } >Logout</button>
          </div>
          <Switch>
            <Route path="/">
              <Home userId={ currentUser.id }/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
