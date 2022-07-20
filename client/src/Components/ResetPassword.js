import { useState } from "react"
import { useEffect } from "react";

function ResetPassword()
{

    const [login, setLogin] = useState({username: "", email: "", password: ""})

    function handleChange(e)
    {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    // function submitChange()
    // {
    //     const data =
    //     {
    //         username: login.username,
    //         password: login.password,
    //         email: login.email
    //     }
    //     fetch(`/users/1`,
    //     {
    //         method: "PATCH",
    //         headers:
    //         {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     .then(resp => resp.json())
    //     .then((data) => console.log(data))
    // }

    return (
        <div>
            <h1>Reset password here</h1>
            <label>
                Username:
                <input onChange={ handleChange } name="username" />
            </label>
            <label>
                Email:
                <input onChange={ handleChange } name="email" />
            </label>
            <label>
                New password:
                <input type="password" onChange={ handleChange } name="password" />
            </label>
            {/* <button onClick={ submitChange }>Submit</button> */}
        </div>
    )
}
export default ResetPassword