import { useState } from "react";
import ActivityItem from "./ActivityItem";
import Button from 'react-bootstrap/Button';

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

    const [isFlights, setIsFlights] = useState(true)
    const [isHotel, setIsHotel] = useState(false)
    const [isActivity, setIsActivity] = useState(false)

    const dispActivities = activitiesList.map((item) =>
    {
        return (
            <ActivityItem item={ item } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
        )
    })

    function showFlight()
    {
        setIsFlights((isFlights) => isFlights = !isFlights)
        setIsHotel(false)
        setIsActivity(false)
    }

    function showHotel()
    {
        setIsHotel((isHotel) => isHotel = !isHotel)
        setIsFlights(false)
        setIsActivity(false)
    }

    function showActivity()
    {
        setIsActivity((isActivity) => isActivity= !isActivity)
        setIsHotel(false)
        setIsFlights(false)
    }

    return (
        <div>
            <h2 id="editTitle">Edit Trip</h2>
            <div id="editButtons">
                <Button onClick={ showFlight } className="editBut" id="editButtonStyle">Flights</Button>
                <Button onClick={ showHotel } className="editBut" id="editButtonStyle">Hotel</Button>
                <Button onClick={ showActivity } className="editBut" id="editButtonStyle">Activity</Button>
            </div>

            <form onSubmit={ submitVacaDetails}>
                {isFlights?
                    <div className="editCont">
                        <div id="editDept">
                            <h3 className="editHeader">Departing flight:</h3>
                            <input name="dFlightM" onChange={ handleDetailInput } placeholder="mm" className="editDeptIn" id="dfm"/>
                            <input name="dFlightD" onChange={ handleDetailInput } placeholder="dd" className="editDeptIn" id="dfd"/>
                            <input name="dFlightY" onChange={ handleDetailInput } placeholder="yyyy" className="editDeptIn" id="dfy"/>
                            <input name="dFlightH" onChange={ handleDetailInput } placeholder="hh" className="editDeptIn" id="dfh"/>
                            <input name="dFlightMin" onChange={ handleDetailInput } placeholder="mm" className="editDeptIn" id="dfMin"/>
                        </div>
                        <div id="editArr">
                            <h3 className="editHeader">Arriving flight:</h3>
                            <input name="aFlightM" onChange={ handleDetailInput } placeholder="mm" className="editDeptIn" id="dfm"/>
                            <input name="aFlightD" onChange={ handleDetailInput } placeholder="dd" className="editDeptIn" id="dfd"/>
                            <input name="aFlightY" onChange={ handleDetailInput } placeholder="yyyy" className="editDeptIn" id="dfy"/>
                            <input name="aFlightH" onChange={ handleDetailInput } placeholder="hh" className="editDeptIn" id="dfh"/>
                            <input name="aFlightMin" onChange={ handleDetailInput } placeholder="mm" className="editDeptIn" id="dfMin"/>
                        </div>
                        <Button id="editSubmit">Submit</Button>
                    </div>
                : <div></div> 
                }

                {isHotel ?
                    <div className="editCont">
                        <div id="editIn">
                            <h3 className="editHeader">Hotel check-in:</h3>
                            <input name="iHotelH" onChange={ handleDetailInput } placeholder="hh" className="editHotel" id="hh"/>
                            <input name="iHotelM" onChange={ handleDetailInput } placeholder="mm" className="editHotel" id="hm"/>
                        </div>
                        <div id="editOut">
                            <h3 className="editHeader">Hotel check-out:</h3>
                            <input name="oHotelH" onChange={ handleDetailInput } placeholder="hh" className="editHotel" id="hh"/>
                            <input name="oHotelM" onChange={ handleDetailInput } placeholder="mm" className="editHotel" id="hm"/>
                        </div>
                        <Button id="hotelSubmit">Submit</Button>
                    </div>
                : <div></div>
                }
            </form>

            {isActivity ?
                <div className="editCont">
                    <div id="addAct">
                        <h3 className="editHeader">Add activity:</h3>
                        <input name="activityName" onChange={ handleActivityInput } placeholder="Enter name..." className="actIn" id="actName"/>
                        <input name="aMonth" onChange={ handleActivityInput } placeholder="mm" className="actIn" id="actMonth"/>
                        <input name="aDay" onChange={ handleActivityInput } placeholder="dd" className="actIn" id="actDay"/>
                        <input name="aYear" onChange={ handleActivityInput } placeholder="yyyy" className="actIn" id="actYear"/>
                        <input name="aHour" onChange={ handleActivityInput } placeholder="hh" className="actIn" id="actHour"/>
                        <input name="aMinute" onChange={ handleActivityInput } placeholder="mm" className="actIn" id="actMin"/>
                        <Button onClick={ submitActivity } id="actSubmit">Submit</Button>
                    </div>
                    <div id="showAct">
                        <h3 className="editHeader">Edit activities:</h3>
                        <ul id="editActList">
                            { dispActivities }
                        </ul>
                    </div>
                </div>
            :
                <div></div>}
        </div>
    )
}
export default Information