import { useState } from "react";
import Button from 'react-bootstrap/Button';

function Login({ setCurrentUser, renderLists })
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
        .then (res => {
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
    
    const [isForgot, setIsForgot] = useState(false)
    function forgotPass(e)
    {
      setIsForgot((isForgot) => isForgot = !isForgot)
    }

    const [resetEmail, setResetEmail] = useState("")

    function handleResetEmail(e)
    {
      setResetEmail(e.target.value)
    }

    function sendReset()
    {
      fetch(`/reset`,
      {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetEmail)
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
    }

    return (
        <div classname="login">
            <form onSubmit={handleLogin}>
              <div id="loginInput">
                <input
                    id="loginOutline"
                    type="text"
                    placeholder="Username"
                    value={ username }
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div id="loginInput">
                <input
                    id="loginOutline"
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div> 
              <div>
                <Button variant="secondary" id="loginButton" type="submit">Login</Button>
              </div>
              <div>
                <p>{ errors }</p>
              </div>
            </form>

            <a onClick={ forgotPass }>Forgot password?</a>
                  {isForgot?
                    <div>
                      <p>Send email to reset password</p>
                      <input onChange={ handleResetEmail } placeholder="email"/>
                      <button onClick={ sendReset }>Send</button>
                    </div>
                  :
                    <div>
                    </div>
                  }
        </div>
    )
}
export default Login