import { useState } from "react" 
import VacaName from "./VacaName"

function Home({ userId, vacationList, handleAddVaca, handleVacaPatch, handleDeleteVaca })
{

    const [vacationInput, setVacationInput] = useState("")
    function handleVacationInput(e)
    {
        setVacationInput(e.target.value)
    }

    function handleAddVacation()
    {
        const vacation = {vacationName: vacationInput}
        fetch("/vacations", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vacation)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleAddVaca(data)
            const userVaca = 
            {
                user_id: userId,
                vacation_id: data.id
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
        })
    }

    const vacaNameList = vacationList.map((item) =>
    {
        return (
            <VacaName item={ item } clickVacation={ clickVacation }/>
        )
    })

    const [isDetails, setIsDetails] = useState(false)
    const [selectedVaca, setSelectedVaca] = useState("")

    function clickVacation(e)
    {
        setIsDetails(true)

        const findVaca = vacationList.find((item) => item.id == e)

        setSelectedVaca(findVaca)
    }

    function goBack()
    {
        setIsDetails(false)
    }

    const [isEdit, setIsEdit] = useState(false)
    function edit()
    {
        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    const [vacaPatch, setVacaPatch] = useState("")

    function handleEditVaca(e)
    {
        setVacaPatch(e.target.value)
    }

    function submitEditVaca(e)
    {
        const vacaPatchData =
        {
            vacationName: vacaPatch,
            flightToArrive: "",
            flightToLeave: "",
            hotelCheckIn: "",
            hotelCheckOut: ""
        }


        fetch(`/vacations/${selectedVaca.id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vacaPatchData)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleVacaPatch(data)
            // setIsEdit(false)
        })
    }

    function deleteVaca()
    {
        fetch(`/vacations/${selectedVaca.id}`, {
            method: "DELETE",
          })
        .then((res) => res.json())
        .then((data) => handleDeleteVaca(data));
    }

    return (
        <div id="home">
            <h1>home</h1>
            { isDetails ?
                <div>
                    <h2>Vacation Details</h2>
                    <button onClick={ goBack }>Go back</button>
                    { isEdit ?
                        <div>
                            <button onClick={ edit }>Unedit</button>
                            <input onChange={ handleEditVaca }/>
                            <button onClick={ submitEditVaca }>Submit</button>
                            <button onClick={ deleteVaca }>Delete</button>
                        </div>
                    :
                        <div>
                            <button onClick={ edit }>Edit</button>
                            { selectedVaca.vacationName }
                        </div>
                    }
                </div>
            :
                <div>
                    <input onChange={handleVacationInput }></input>
                    <button onClick={ handleAddVacation }>Add vacation</button>
                    <ul>
                        { vacaNameList }
                    </ul>
                </div>
            }
        </div>
    )
}
export default Home