import { useState } from "react";
import landingPic2 from "../landingPic2.jpg"
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Signup from "./Signup"

function Landing({ setCurrentUser, renderLists })
{
        //handles user login 
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [errors, setErrors] = useState("");
    
        function handleLogin(e) 
        {
            e.preventDefault();
    
            const user = {username, password}
    
            fetch("/login", 
            {
              method: "POST",
              headers: 
              {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            })
            .then (res => 
            {
              if (res.ok)
              {
                res.json().then(setCurrentUser)
              }
              else{
                res.json().then( e => setErrors(Object.entries(e.error).flat()))
              }
            })
            .then(() => renderLists());
        }

    return (
        <div id="landingPage">
            <Router>
                <Switch>
                    <Route path="/signup">
                        <Signup setCurrentUser={ setCurrentUser } renderLists={ renderLists }/>
                    </Route>
                    <Route path="/">
                        <img id="landingPic2" src={landingPic2}/>
                        <div id="landingBack"></div>
                        <h1 id="landingTitle">Travel Planner</h1>
                        <form onSubmit={handleLogin}>
                            <input 
                                id="landingUsername" 
                                type="text"
                                placeholder="Username"
                                value={ username }
                                onChange={(e) => setUsername(e.target.value)}/>
                            <input 
                                id="landingPassword" 
                                type="password"
                                placeholder="Password"
                                value={ password }
                                onChange={(e) => setPassword(e.target.value)}/>
                            <Button id="landingLogin" type="submit">Login</Button>
                        </form>
                        <Link to="/signup">
                            <h5 id="landingSignUp">Signup</h5>
                        </Link>
                    </Route>
                </Switch>
            </Router>
            <p id="loginErrors">{ errors[1] }</p>

            {/* <a onClick={ forgotPass }>Forgot username?</a>
                  {isForgot?
                    <div>
                      <p>Send email to reset username</p>
                      <input onChange={ handleResetEmail } placeholder="email"/>
                      <button onClick={ sendReset }>Send</button>
                    </div>
                  :
                    <div>
                    </div>
                  } */}
        </div>
    )
}
export default Landing