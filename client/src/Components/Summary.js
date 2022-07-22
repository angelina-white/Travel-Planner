
import { useEffect, useState } from "react"

function Summary({ selectedVaca })
{
    const [leave, setLeave] = useState("")
    const [arrive, setArrive] = useState("")
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
        }

        //arrive
        if (selectedVaca.aFlightM == null || selectedVaca.aFlightD == null || selectedVaca.aFlightY == null)
        {
            setArrive("")
        }
        else
        {
            setArrive(`Arriving flight: ${selectedVaca.aFlightM}/${selectedVaca.aFlightD}/${selectedVaca.aFlightY}`)
        }

        //checkin
        if (selectedVaca.iHotelH == null || selectedVaca.iHotelM == null)
        {
            setCheckIn("")
        }
        else
        {
            setCheckIn(`Hotel check in: ${selectedVaca.iHotelH}:${selectedVaca.iHotelM}`)
        }


        //checkout
        if (selectedVaca.oHotelH == null || selectedVaca.oHotelM == null)
        {
            setCheckOut("")
        }
        else
        {
            setCheckOut(`Hotel check out: ${selectedVaca.oHotelH}:${selectedVaca.oHotelM}`)
        }
    }, [])

    return (
        <div>
            <h1>Summary</h1>
            <h2>Summary</h2>
            <h3>Flights</h3>
            <h4>{ leave }</h4>
            <h4>{ arrive }</h4>
            <h3>Hotels</h3>
            <h4>{ checkIn }</h4>
            <h4>{ checkOut }</h4>
            <h3>Activities</h3>
        </div>
    )
}
export default Summary