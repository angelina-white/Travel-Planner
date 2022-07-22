import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useState } from "react"

function Agenda({ selectedVaca, activitiesList })
{
    //handles dates for calendar
    const locales = {'en-US': enUS }
    
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })
    
    //list of vacation details
    const interviewEvents = 
    [
        {
            title: "Test",
            start: new Date(2022, 6, 25, 14, 30),
            end: new Date(2022, 6, 25, 16, 30),
        },
        {
            title: "Departing flight",
            start: new Date(selectedVaca.dFlightY, (selectedVaca.dFlightM - 1), selectedVaca.dFlightD, selectedVaca.dFlightH, selectedVaca.dFlightMin),
            end: new Date(selectedVaca.dFlightY, (selectedVaca.dFlightM - 1), selectedVaca.dFlightD, selectedVaca.dFlightH, selectedVaca.dFlightMin),
        },
        {
            title: "Hotel check in",
            start: new Date(selectedVaca.dFlightY, (selectedVaca.dFlightM - 1), selectedVaca.dFlightD, selectedVaca.iHotelH, selectedVaca.iHotelM),
            end: new Date(selectedVaca.dFlightY, (selectedVaca.dFlightM - 1), selectedVaca.dFlightD, selectedVaca.iHotelH, selectedVaca.iHotelM),
        },
        {
            title: "Arriving flight",
            start: new Date(selectedVaca.aFlightY, (selectedVaca.aFlightM - 1), selectedVaca.aFlightD, selectedVaca.aFlightH, selectedVaca.aFlightMin),
            end: new Date(selectedVaca.aFlightY, (selectedVaca.aFlightM - 1), selectedVaca.aFlightD, selectedVaca.aFlightH, selectedVaca.aFlightMin),
        },
        {
            title: "Hotel check out",
            start: new Date(selectedVaca.aFlightY, (selectedVaca.aFlightM - 1), selectedVaca.aFlightD, selectedVaca.oHotelH, selectedVaca.oHotelM),
            end: new Date(selectedVaca.aFlightY, (selectedVaca.aFlightM - 1), selectedVaca.aFlightD, selectedVaca.oHotelH, selectedVaca.oHotelM),
        }
    ]

    //gets list of activities
    const actList = activitiesList.map((item) =>
    {
        return (
            {
                title: item.activityName,
                start: new Date(item.aYear, (item.aMonth - 1), item.aDay, item.aHour, item.aMinute),
                end: new Date(item.aYear, (item.aMonth - 1), item.aDay, item.aHour, item.aMinute)
            }
        )
    })
    
    const [list, setList] = useState([...interviewEvents, ...actList])
    
    //style for calendar
    function eventStyleGetter(event, start, end, isSelected) 
    {
        var backgroundColor = "#C8E0DD"
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
            };

        if (event.title == "Departing flight")
        {
            style.backgroundColor = '#ff0000'
        }
        else if (event.title == "Arriving flight")
        {
            style.backgroundColor = '#ff0000'
        }
        else if (event.title == "Hotel check in")
        {
            style.backgroundColor = '#FFA500'
        }
        else if (event.title == "Hotel check out")
        {
            style.backgroundColor = '#FFA500'
        }
        return {
            style: style
        }
    };

    return (
        <div>
            <Calendar
                    localizer={localizer}
                    events={list}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 535, width: 1350 }}
                    eventPropGetter={(eventStyleGetter)}
                />
        </div>
    )
}
export default Agenda