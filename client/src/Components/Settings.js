import { useState, useEffect } from "react";

function Settings({ handleNamePatch, setSelectedName, userList, selectedVaca, handleDeleteVaca})
{
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

        const emailData = 
        {
            email: findUser[0].email
        }

        fetch("/vacations/add", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
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