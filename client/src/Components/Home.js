import { useState } from "react" 
import VacaItem from "./VacaItem"

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

    const vacaDispList = vacationList.map((item) =>
    {
        return (
            <VacaItem item={ item } />
        )
    })

    return (
        <div id="home">
            <h1>home</h1>
            <input onChange={handleVacationInput }></input>
            <button onClick={ handleAddVacation }>Add vacation</button>
            <ul>
                { vacaDispList }
            </ul>
        </div>
    )
}
export default Home