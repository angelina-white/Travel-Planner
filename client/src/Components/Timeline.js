import Line from "./Line"

function Timeline({ selectedVaca, activitiesList })
{
    const flightToLeave = `${selectedVaca.dFlightM}/${selectedVaca.dFlightD}/${selectedVaca.dFlightY}`
    const flightToArrive = `${selectedVaca.aFlightM}/${selectedVaca.aFlightD}/${selectedVaca.aFlightY}`

    //make lines show up according to where they are on the timeline
    //make lines hover
    const lines = activitiesList.map((item) =>
    {
        return (
            <Line item={ item } selectedVaca={ selectedVaca } />
        )
    })

    return (
        <div>
            <h1>Timeline</h1>
            <div id="horizontalLine"></div>
            <div className="circle" id="start"></div>
            <div className="date" id="startDate"> { flightToLeave }</div>
            {/* <div className="line" id="first"></div> */}
            { lines }
            <div className="date" id="endDate"> { flightToArrive }</div>
            <div className="circle" id="end"></div>
        </div>
    )
}
export default Timeline