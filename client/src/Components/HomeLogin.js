import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useEffect } from "react";

function HomeLogin({ setCurrentUser, renderLists })
{


    return (
        <div>
            <Router>
                <Switch>
                    {/* <Route path="/password"> */}
                    {/* <Route path="/reset/edit">
                        <ResetPassword />
                    </Route> */}
                    <Route path="/">
                        <h3>Login:</h3>
                        <Login setCurrentUser={ setCurrentUser } renderLists={ renderLists } />
                        <h3>Signup:</h3>
                        <Signup setCurrentUser={ setCurrentUser }/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default HomeLogin