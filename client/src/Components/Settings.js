import { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import io from 'socket.io-client';

function Settings({ handleNamePatch, setSelectedName, userList, selectedVaca})
{
    const [socket, setSocket] = useState(null)
    useEffect(() =>
    {
      setSocket(io("http://localhost:4001"))
    }, [])

    const [vacaName, setVacaName] = useState("")

    function submitName()
    {
        handleNamePatch(vacaName)
        setSelectedName(vacaName)
    }

    const [addUsername, setAddUsername] = useState("")
    function addUserInput(e)
    {
        setAddUsername(e.target.value)
    }

    function submitAddUser()
    {
        // socket.emit("addUserToVaca", addUsername)
        //get username X
        //send username to socket server X
        //socket server gets username and looks for username X
        //socket server sends message to specific username
        //find somewhere to put notification
        //probably recieve in app.js and show note in console first


        //gets user id from userList
        //sends post request to user_vacations
        const findUser = userList.filter((item) =>
        {
            return (
                item.username === addUsername
            )
        })

        const userVaca = 
        {
            user_id: findUser[0].id,
            vacation_id: selectedVaca.id
        }

        fetch("/user_vacations", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userVaca)
        })
        .then(resp => resp.json())
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/editName">
                        <Link to="/">Go back</Link>
                        <input onChange={ (e) => setVacaName(e.target.value) } placeholder="Enter new name..." />
                        <button onClick={ submitName }>Submit</button>
                    </Route>
                    <Route path="/addUser">
                        <Link to="/">Go back</Link>
                        <input onChange={ addUserInput }placeholder="Enter username..." />
                        <button onClick={ submitAddUser }>Submit</button>
                    </Route>
                    <Route path="/">
                        <h1>settings home</h1>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/editName">Edit name</Link>
                                </li>
                                <li>
                                    <Link to="/addUser">Add user</Link>
                                </li>
                            </ul>
                        </nav>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default Settings