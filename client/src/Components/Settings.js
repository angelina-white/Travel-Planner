import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function Settings({ handleNamePatch, setSelectedName, userList, selectedVaca, handleDeleteVaca})
{
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);


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

    // const [isEditName, setIsEditName] = useState(false)
    // const [isAddUser, setIsAddUser] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    function deleteVaca()
    {
        fetch(`/vacations/${selectedVaca.id}`, {
            method: "DELETE",
          })
        .then((res) => res.json())
        .then((data) => 
        {
            handleDeleteVaca(data)
            setIsDeleted(true)
        });
    }

    const [isDeleted, setIsDeleted] = useState(false)

    return (
        <div>
            <h2 id="settingsTitle">Settings</h2>
            <div id="settingsCont">
                <div id="changeName">
                    <h3 className="settingsHeader">Change trip name:</h3>
                    <input onChange={ (e) => setVacaName(e.target.value) } placeholder="Enter new name..."  id="changeNameInput"/>
                    <Button onClick={ submitName } id="submitSettings">Submit</Button>
                </div>
                <div id="addUserCont">
                    <h3 className="settingsHeader">Add user to trip: </h3>
                    <input onChange={ addUserInput }placeholder="Enter username..." id="changeNameInput"/>
                    <Button onClick={ submitAddUser } id="submitSettings">Submit</Button>
                </div>
                <Button id="deleteButton" onClick={() => setIsDelete((isDelete) => isDelete = !isDelete)}>Delete vacation</Button>
                {isDelete ?
                    <div id="deleteQuestion">
                        <h4 id="deleteQ">Are you sure?</h4>
                        <Button id="deleteAgain" onClick={ deleteVaca }>Delete now</Button>
                        {isDeleted ?
                            <div>
                                <p id="deletedMessage">This trip has been deleted.</p>
                            </div>
                        :
                            <div>
                            </div>
                        }
                    </div>
                : <div></div>} 
            </div>
        </div>
    )
}
export default Settings