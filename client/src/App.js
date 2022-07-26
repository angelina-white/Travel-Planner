import './App.css';
import Home from "./Components/Home"
import Landing from "./Components/Landing"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function App() 
{

  const [currentUser, setCurrentUser] = useState("");
  const [vacationList, setVacationList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [userList, setUserList] = useState([]);

function renderLists(data)
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

          fetch(`/users`)
          .then(resp => resp.json())
          .then(data => setUserList(data))
        })
      }
    })
  }

  if(!currentUser) return <Landing setCurrentUser = { setCurrentUser } renderLists={ renderLists }/>

  //logs user out
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => 
    {
      setCurrentUser("")
      setVacationList([])
      setActivitiesList([])
      setUserList([])
    });
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
    <div className="App" id="grad">
      <Router>
        {/* <div id="navbar">
          <h1>Travel Planner</h1>
          <nav>
            <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
            </ul>
          </nav>
        </div> */}
        <div id="appCont">
          <div>
            <h1 id="travelPlannerTitle">Travel Planner</h1>
            <Dropdown id="username">
              <Dropdown.Toggle variant="success" id="usernameCont">{ currentUser.username }</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={ handleLogout }>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Switch>
            <Route path="/">
              <Home userId={ currentUser.id } username={ currentUser.username } vacationList={ vacationList } handleAddVaca={ handleAddVaca } handleVacaPatch={ handleVacaPatch } handleDeleteVaca={ handleDeleteVaca } getActivities={ getActivities } activitiesList={ activitiesList } handleAddActivity={ handleAddActivity } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity } userList={ userList } />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
