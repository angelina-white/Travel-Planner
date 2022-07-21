import { useState } from "react"
import ActivityItem from "./ActivityItem"

function Information({ selectedVaca, handleVacaPatch, handleAddActivity, activitiesList, setSelectedVaca })
{
    const [vacaDetails, setVacaDetails] = useState({
        flightToArrive: selectedVaca.flightToArrive, 
        flightToLeave: selectedVaca.flightToLeave, 
        hotelCheckIn: selectedVaca.hotelCheckIn, 
        hotelCheckOut: selectedVaca.hotelCheckOut
    })

    function handleDetailInput(e)
    {
        setVacaDetails({...vacaDetails, [e.target.name]: e.target.value})
    }

    function submitVacaDetails(e)
    {
        e.preventDefault()
        const detailData = 
        {
            vacationName: selectedVaca.vacationName,
            flightToArrive: vacaDetails.flightToArrive,
            flightToLeave: vacaDetails.flightToLeave,
            hotelCheckIn: vacaDetails.hotelCheckIn,
            hotelCheckOut: vacaDetails.hotelCheckOut
        }

        fetch(`/vacations/${selectedVaca.id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detailData)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleVacaPatch(data)
            setSelectedVaca(data)
        })
    }

     const [actName, setActName] = useState("")

    function handleActivityInput(e)
    {
        setActName(e.target.value)
    }

    function submitActivity()
    {
        const activity = {activityName: actName}
        fetch("/activities", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleAddActivity(data)
            const vacaAct = 
            {
                vacation_id: selectedVaca.id,
                activity_id: data.id
            }

            fetch("/vacation_activities", 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vacaAct)
            })
            .then(resp => resp.json())
        })
    }

    const [isEditInfo, setIsEditInfo] = useState(false)
    const [isFlights, setIsFlights] = useState(false)
    const [isHotel, setIsHotel] = useState(false)
    const [isActivity, setIsActivity] = useState(false)

    const dispActivities = activitiesList.map((item) =>
    {
        return (
            <ActivityItem item={ item } />
        )
    })

    return (
        <div>
            {isEditInfo ?
                <div>
                    <button onClick={() => setIsEditInfo((isEditInfo) => isEditInfo = !isEditInfo)}>Unedit</button>
                    <button onClick={() => setIsFlights((isFlights) => isFlights = !isFlights)}>Flights</button>
                    <button onClick={() => setIsHotel((isHotel) => isHotel = !isHotel)}>Hotel</button>
                    <button onClick={() => setIsActivity((isActivity) => isActivity = !isActivity)}>Activity</button>
                </div>
            : 
                <div>
                    <button onClick={() => setIsEditInfo((isEditInfo) => isEditInfo = !isEditInfo)}>Edit Info</button>
                </div>
            }

            <form onSubmit={ submitVacaDetails}>

                {isFlights?
                    <div>
                        <label>
                            Departing flight:
                            <input name="flightToArrive" onChange={ handleDetailInput } placeholder="yyyy/mm/dd"/>
                        </label>
                        <label>
                            Arriving flight:
                            <input name="flightToLeave" onChange={ handleDetailInput } placeholder="yyyy/mm/dd"/>
                        </label>
                        <button>Submit</button>
                    </div>
                : <div></div> 
                }

                {isHotel ?
                    <div>
                        <label>
                            Hotel check-in:
                            <input name="hotelCheckIn" onChange={ handleDetailInput } placeholder="Enter..."/>
                        </label>
                        <label>
                            Hotel check-out:
                            <input name="hotelCheckOut" onChange={ handleDetailInput } placeholder="Enter..."/>
                        </label>
                        <button>Submit</button>
                    </div>
                : <div></div>
                }
            </form>

            {isActivity ?
                <div>
                    <label>
                        Activity name:
                        <input onChange={ handleActivityInput }/>
                        <button onClick={ submitActivity }>Submit</button>
                    </label>
                </div>
            :
                <div></div>}

            <h2>Summary</h2>
            <h3>Flights</h3>
            <h4>Departing flight: {selectedVaca.flightToArrive}</h4>
            <h4>Arriving flight: {selectedVaca.flightToLeave}</h4>
            <h3>Hotels</h3>
            <h4>Hotel check-in: {selectedVaca.hotelCheckIn}</h4>
            <h4>Hotel check-out: {selectedVaca.hotelCheckOut}</h4>
            <h3>Activities</h3>
            <ul>
                { dispActivities }
            </ul>
        </div>
    )
}
export default Information