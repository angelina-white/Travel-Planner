import { useState } from "react"
import ActivityItem from "./ActivityItem"

function Information({ selectedVaca, handleVacaPatch, handleAddActivity, setSelectedVaca, handleActivityPatch, handleDeleteActivity, activitiesList })
{
    const [vacaDetails, setVacaDetails] = useState(
    {
        dFlightM: selectedVaca.dFlightM,
        dFlightD: selectedVaca.dFlightD,
        dFlightY: selectedVaca.dFlightY,
        dFlightH: selectedVaca.dFlightH,
        dFlightMin: selectedVaca.dFlightMin,

        aFlightM: selectedVaca.aFlightM,
        aFlightD: selectedVaca.aFlightD,
        aFlightY: selectedVaca.aFlightY,
        aFlightH: selectedVaca.aFlightH,
        aFlightMin: selectedVaca.aFlightMin,

        iHotelH: selectedVaca.iHotelH,
        iHotelM: selectedVaca.iHotelM,

        oHotelH: selectedVaca.oHotelH,
        oHotelM: selectedVaca.oHotelM
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

            dFlightM: vacaDetails.dFlightM,
            dFlightD: vacaDetails.dFlightD,
            dFlightY: vacaDetails.dFlightY,
            dFlightH: vacaDetails.dFlightH,
            dFlightMin: vacaDetails.dFlightMin,
    
            aFlightM: vacaDetails.aFlightM,
            aFlightD: vacaDetails.aFlightD,
            aFlightY: vacaDetails.aFlightY,
            aFlightH: vacaDetails.aFlightH,
            aFlightMin: vacaDetails.aFlightMin,
    
            iHotelH: vacaDetails.iHotelH,
            iHotelM: vacaDetails.iHotelM,
    
            oHotelH: vacaDetails.oHotelH,
            oHotelM: vacaDetails.oHotelM
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

     const [activity, setActivity] = useState(
    {
        activityName: "",
        aMonth: "",
        aDay: "",
        aYear: "",
        aHour: "",
        aMinute: ""
    })

    function handleActivityInput(e)
    {
        setActivity({...activity, [e.target.name]: e.target.value})
    }

    function submitActivity()
    {
        const data = 
        {
            activityName: activity.activityName,
            aMonth: parseInt(activity.aMonth),
            aDay: parseInt(activity.aDay),
            aYear: parseInt(activity.aYear),
            aHour: parseInt(activity.aHour),
            aMinute: parseInt(activity.aMinute)
        }
        fetch("/activities", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
            <ActivityItem item={ item } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
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
                            <input name="dFlightM" onChange={ handleDetailInput } placeholder="mm"/>
                            <input name="dFlightD" onChange={ handleDetailInput } placeholder="dd"/>
                            <input name="dFlightY" onChange={ handleDetailInput } placeholder="yyyy"/>
                            <input name="dFlightH" onChange={ handleDetailInput } placeholder="hh"/>
                            <input name="dFlightMin" onChange={ handleDetailInput } placeholder="mm"/>
                        </label>
                        <label>
                            Arriving flight:
                            <input name="aFlightM" onChange={ handleDetailInput } placeholder="mm"/>
                            <input name="aFlightD" onChange={ handleDetailInput } placeholder="dd"/>
                            <input name="aFlightY" onChange={ handleDetailInput } placeholder="yyyy"/>
                            <input name="aFlightH" onChange={ handleDetailInput } placeholder="hh"/>
                            <input name="aFlightMin" onChange={ handleDetailInput } placeholder="mm"/>
                        </label>
                        <button>Submit</button>
                    </div>
                : <div></div> 
                }

                {isHotel ?
                    <div>
                        <label>
                            Hotel check-in:
                            <input name="iHotelH" onChange={ handleDetailInput } placeholder="hh"/>
                            <input name="iHotelM" onChange={ handleDetailInput } placeholder="mm"/>
                        </label>
                        <label>
                            Hotel check-out:
                            <input name="oHotelH" onChange={ handleDetailInput } placeholder="hh"/>
                            <input name="oHotelM" onChange={ handleDetailInput } placeholder="mm"/>
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
                        <input name="activityName" onChange={ handleActivityInput } placeholder="Enter name..."/>
                        <input name="aMonth" onChange={ handleActivityInput } placeholder="mm"/>
                        <input name="aDay" onChange={ handleActivityInput } placeholder="dd"/>
                        <input name="aYear" onChange={ handleActivityInput } placeholder="yyyy"/>
                        <input name="aHour" onChange={ handleActivityInput } placeholder="hh"/>
                        <input name="aMinute" onChange={ handleActivityInput } placeholder="mm"/>
                        <button onClick={ submitActivity }>Submit</button>
                    </label>
                </div>
            :
                <div></div>}

            <ul>
                { dispActivities }
            </ul>
        </div>
    )
}
export default Information