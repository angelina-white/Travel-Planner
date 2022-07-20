import './App.css';
import Home from "./Components/Home"
import HomeLogin from "./Components/HomeLogin"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions"; //action

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [vacationList, setVacationList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);

  const counter = useSelector(state => state.counter); //state
  const dispatch = useDispatch();

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

  if(!currentUser) return <HomeLogin setCurrentUser = { setCurrentUser } renderLists={ renderLists }/>

  //logs user out
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setCurrentUser(""));
  }

  function handleAddVaca(data)
  {
    setVacationList([...vacationList, data])
  }

  function handleVacaPatch(data)
  {
    const newListing = vacationList.map((item) =>
    {
      if (item.id == data.id)
        return data
      else
        return item
    })

    setVacationList(newListing)
  }

  function handleDeleteVaca(data)
  {
    const filteredList = vacationList.filter(item => item.id !== data)
    setVacationList(filteredList)
  }

  function getActivities(data)
  {
    fetch(`/users/${currentUser.id}/vacations/${data}/activities`)
    .then(resp => resp.json())
    .then(data => setActivitiesList(data))
  }

  function handleAddActivity(data)
  {
    setActivitiesList([...activitiesList, data])
  }

  function handleActivityPatch(data)
  {
    const newListing = activitiesList.map((item) =>
    {
      if (item.id == data.id)
        return data
      else
        return item
    })

    setActivitiesList(newListing)
  }

  function handleDeleteActivity(data)
  {
    const filteredList = activitiesList.filter(item => item.id !== data)
    setActivitiesList(filteredList)
  }


  return (
    <div className="App">
      <h1>Counter: { counter }</h1>
      <button onClick={ () => dispatch(increment()) }>+</button>
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
              <Home userId={ currentUser.id } vacationList={ vacationList } handleAddVaca={ handleAddVaca } handleVacaPatch={ handleVacaPatch } handleDeleteVaca={ handleDeleteVaca } getActivities={ getActivities } activitiesList={ activitiesList } handleAddActivity={ handleAddActivity } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
