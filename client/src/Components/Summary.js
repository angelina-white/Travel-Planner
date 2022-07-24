
import { useEffect, useState } from "react"

function Summary({ selectedVaca })
{
    const [leave, setLeave] = useState("")
    const [leaveTime, setLeaveTime] = useState("")
    const [arrive, setArrive] = useState("")
    const [arriveTime, setArriveTime] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    useEffect(() =>
    {
        //leave
        if (selectedVaca.dFlightM == null || selectedVaca.dFlightD == null || selectedVaca.dFlightY == null)
        {
            setLeave("")
        }
        else
        {
            setLeave(`Departing flight: ${selectedVaca.dFlightM}/${selectedVaca.dFlightD}/${selectedVaca.dFlightY}`)
            if (selectedVaca.dFlightH == 0 && selectedVaca.dFlightMin == 0)
            {
                setLeaveTime("")
            }
            else if (selectedVaca.dFlightMin == 0)
            {
                setLeaveTime(`Time: ${selectedVaca.dFlightH}:00`)
            }
            else{
                setLeaveTime(`Time: ${selectedVaca.dFlightH}:${selectedVaca.dFlightMin}`)
            }
        }

        //arrive
        if (selectedVaca.aFlightM == null || selectedVaca.aFlightD == null || selectedVaca.aFlightY == null)
        {
            setArrive("")
        }
        else
        {
            setArrive(`Arriving flight: ${selectedVaca.aFlightM}/${selectedVaca.aFlightD}/${selectedVaca.aFlightY}`)
            if (selectedVaca.aFlightH == 0 && selectedVaca.aFlightMin == 0)
            {
                setArriveTime("")
            }
            else if (selectedVaca.aFlightMin == 0)
            {
                setArriveTime(`Time: ${selectedVaca.aFlightH}:00`)
            }
            else{
                setArriveTime(`Time: ${selectedVaca.aFlightH}:${selectedVaca.aFlightMin}`)
            }
        }

        //checkin
        if (selectedVaca.iHotelH == null || selectedVaca.iHotelM == null)
        {
            setCheckIn("Add hotel check in")
        }
        else if (selectedVaca.iHotelM == 0)
        {
            setCheckIn(`Hotel check in: ${selectedVaca.iHotelH}:00`)
        }
        else
        {
            setCheckIn(`Hotel check in: ${selectedVaca.iHotelH}:${selectedVaca.iHotelM}`)
        }


        //checkout
        if (selectedVaca.oHotelH == null || selectedVaca.oHotelM == null)
        {
            setCheckOut("Add hotel check out")
        }
        else if (selectedVaca.oHotelM == 0)
        {
            setCheckOut(`Hotel check out: ${selectedVaca.oHotelH}:00`)
        }
        else
        {
            setCheckOut(`Hotel check out: ${selectedVaca.oHotelH}:${selectedVaca.oHotelM}`)
        }
    }, [])

    return (
        <div>
            <h2>Summary</h2>
            <h3>Flights</h3>
            <h4>{ leave }</h4>
            <h5>{ leaveTime }</h5>
            <h4>{ arrive }</h4>
            <h5>{ arriveTime }</h5>
            <h3>Hotels</h3>
            <h4>{ checkIn }</h4>
            <h4>{ checkOut }</h4>
            <h3>Activities</h3>
        </div>
    )
}
export default Summary