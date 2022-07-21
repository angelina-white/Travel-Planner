import { useState } from "react";
import Button from 'react-bootstrap/Button';
import jwt from "jsonwebtoken";

function Login({ setCurrentUser, renderLists, setIsNotPassword })
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
        .then((data) => renderLists(username));
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
      const data = 
      { 
        email: resetEmail
      }

      fetch(`/password/reset`,
      {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      // .then((data) =>
      // {
      //   const secret = data.password_digest
      //   const payload =
      //   {
      //     id: data.id,
      //     email: data.email
      //   }
      //   const token = jwt.sign(payload, secret, {expiresIn: '10m'})
      //   const link = `http://localhost:3000/resetpassword/${data.id}/${token}`

      //   const newData = 
      //   {
      //     email: data.email,
      //     link: link
      //   }

      //   fetch(`/reset`,
      //   {
      //     method: 'POST',
      //     headers: 
      //     {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(newData)
      //   })
      //   .then(resp => resp.json())
      // })
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

            <a onClick={ forgotPass }>Forgot username?</a>
                  {isForgot?
                    <div>
                      <p>Send email to reset username</p>
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