import { useState } from "react" 
import VacaName from "./VacaName"

function Home({ userId, vacationList })
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
            .then(data => console.log(data))
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

    return (
        <div id="home">
            <h1>home</h1>
            { isDetails ?
                <div>
                    <h2>Vacation Details</h2>
                    <button onClick={ goBack }>Go back</button>
                    { selectedVaca.vacationName }
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