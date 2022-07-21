import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

function Agenda()
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
            title: "Flight",
            start: new Date(2022, 6, 25, 14, 30),
            end: new Date(2022, 6, 25, 16, 30),
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