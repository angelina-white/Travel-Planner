import { useEffect, useState } from "react"
import Line from "./Line"

function Timeline({ selectedVaca, activitiesList })
{
    const [flightL, setFlightL] = useState("")
    const [flightA, setFlightA] = useState("")

    useEffect(() =>
    {
        //flightL
        if (selectedVaca.dFlightM == null || selectedVaca.dFlightD == null || selectedVaca.dFlightY == null)
        {
            setFlightL("")
        }
        else 
        {
            setFlightL(`${selectedVaca.dFlightM}/${selectedVaca.dFlightD}/${selectedVaca.dFlightY}`)
        }

        //flightA
        if (selectedVaca.aFlightM == null || selectedVaca.aFlightD == null || selectedVaca.aFlightY == null)
        {
            setFlightA("")
        }
        else 
        {
            setFlightA(`${selectedVaca.aFlightM}/${selectedVaca.aFlightD}/${selectedVaca.aFlightY}`)
        }
    }, [])

    const lines = activitiesList.map((item) =>
    {
        return (
            <Line item={ item } selectedVaca={ selectedVaca } />
        )
    })

    return (
        <div id="timelineCont">
            <div id="horizontalLine"></div>
            <div className="circle" id="start"></div>
            <div className="date" id="startDate"> { flightL }</div>
            { lines }
            <div className="date" id="endDate"> { flightA }</div>
            <div className="circle" id="end"></div>
        </div>
    )
}
export default Timeline