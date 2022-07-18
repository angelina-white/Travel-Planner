import Login from "./Login";
import Signup from "./Signup";

function HomeLogin({ setCurrentUser, renderLists })
{
    return (
        <div>
            <h3>Login:</h3>
            <Login setCurrentUser={ setCurrentUser } renderLists={ renderLists } />
            <h3>Signup:</h3>
            <Signup setCurrentUser={ setCurrentUser }/>
        </div>
    )
}
export default HomeLogin