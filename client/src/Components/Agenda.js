import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

function Agenda({ selectedVaca })
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
    
    //gets list of vacation details and activities
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

        return {
            style: style
        }
    };

    return (
        <div>
            <Calendar
                    localizer={localizer}
                    events={interviewEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 535, width: 1350 }}
                    eventPropGetter={(eventStyleGetter)}
                />
        </div>
    )
}
export default Agenda