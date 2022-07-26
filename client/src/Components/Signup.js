import { useState } from "react";
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Landing from "./Landing"
import signupPic from "../signupPic.jpg"

function Signup({ setCurrentUser, renderLists })
{
    //handles user sign up
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");

    function handleSubmit(e) 
    {
        e.preventDefault();

        const user = {username, password, email}

        fetch("/users", 
        {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then (res => {
          if (res.ok)
          {
            res.json().then(setCurrentUser)
          }
          else{
            res.json().then( e => setErrors(Object.entries(e.error).flat()))
          }
        })
        .then(() => renderLists(username))
    }

    return (
        <div id="signupPage">
          <Router>
            <Switch>
              <Route path="/landing">
                  <Landing />
              </Route>
              <Route path="/signup">

                <div id="signupLeft">
                  <div id="signupTopSpace"></div>
                  <Link to="/landing" id="signupBack">
                      Go back
                  </Link>
                  <div id="signupBorder"></div>

                  <h1 id="signupTitle">Sign Up</h1>

                  <form onSubmit={handleSubmit}>
                    <div className="signupInput">
                      <input
                          id="signupUsername"
                          type="text"
                          placeholder="Username"
                          value={ username }
                          onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="signupInput">
                      <input
                          id="signupEmail"
                          type="text"
                          placeholder="Email"
                          value={ email }
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signupInput">
                      <input
                          id="signupPassword"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                      <Button id="signupSubmit" type="submit">Submit</Button>
                  </form>
                </div>

                <div id="signupRight">
                  <img id="signupPic" src={signupPic} />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
    )
}

export default Signup