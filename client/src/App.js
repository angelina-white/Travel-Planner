import './App.css';
import Home from "./Components/Home"
import HomeLogin from "./Components/HomeLogin"
import Landing from "./Components/Landing"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./actions"; //action
import { addBook } from "./actions"; //action

function App() 
{

  const [currentUser, setCurrentUser] = useState("");
  const [vacationList, setVacationList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [userList, setUserList] = useState([]);

  const counter = useSelector(state => state.counter); //state
  const books = useSelector(state => state.books); //state
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

          fetch(`/users`)
          .then(resp => resp.json())
          .then(data => setUserList(data))
        })
      }
    })
  }, [])

  // if(!currentUser) return <HomeLogin setCurrentUser = { setCurrentUser } renderLists={ renderLists }/>
  if(!currentUser) return <Landing setCurrentUser = { setCurrentUser } renderLists={ renderLists }/>

  function renderLists(data)
  {
    console.log("hi")
    // socket.emit("newUser", data)
  }

  //logs user out
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => 
    {
      // socket.emit("remove")
      setCurrentUser("")
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
    <div className="App">
      {/* <h1>{message}</h1> */}
      {/* <h1>Counter: { counter }</h1>
      <button onClick={ () => dispatch(increment()) }>+</button>
      <button onClick={ () => dispatch(addBook({ title: "Snow Crash", author: "Neal Stephenson" })) 
      }>Add book</button>
      <button onClick={ () => dispatch(addBook({ title: "Bobs burgers", author: "Bob" })) 
      }>Add book</button> */}
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
            <h1>Travel Planner</h1>
            <p>{ currentUser.username }</p>
            <button id="logoutButton" onClick={ handleLogout } >Logout</button>
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
