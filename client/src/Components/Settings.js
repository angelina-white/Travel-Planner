import { useState, useEffect } from "react";
// import io from 'socket.io-client';

function Settings({ handleNamePatch, setSelectedName, userList, selectedVaca, handleDeleteVaca})
{
    // const [socket, setSocket] = useState(null)
    // useEffect(() =>
    // {
    //   setSocket(io("http://localhost:4001"))
    // }, [])

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

    const [isEditName, setIsEditName] = useState(false)
    const [isAddUser, setIsAddUser] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    function deleteVaca()
    {
        fetch(`/vacations/${selectedVaca.id}`, {
            method: "DELETE",
          })
        .then((res) => res.json())
        .then((data) => handleDeleteVaca(data));
    }

    return (
        <div>
            <h1>Settings</h1>
            <button onClick={ () => setIsEditName((isEditName) => isEditName = !isEditName)}>Edit vacation name</button>
            {isEditName ?
                <div>
                    <input onChange={ (e) => setVacaName(e.target.value) } placeholder="Enter new name..." />
                    <button onClick={ submitName }>Submit</button>
                </div>
            : <div></div>
            }

            <button onClick={ () => setIsAddUser((isAddUser) => isAddUser = !isAddUser)}>Add user</button>
            {isAddUser ?
                <div>
                    <input onChange={ addUserInput }placeholder="Enter username..." />
                    <button onClick={ submitAddUser }>Submit</button>
                </div>
            : <div></div>
            }

            <button onClick={() => setIsDelete((isDelete) => isDelete = !isDelete)}>Delete vacation</button>
            {isDelete ?
                <button onClick={ deleteVaca }>Delete now</button>
            : <div></div>}
        </div>
    )
}
export default Settings