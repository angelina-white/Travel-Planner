import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../actions"; //action

function Line({ item, activitiesList, selectedVaca })
{
    //TEST DIFFERENT MONTHS AND YEARS BC THIS ONLY WORKS FOR DAYS AS FAR AS U KNOW
    const [sections, setSections] = useState("")
    const [whichDay, setWhichDay] = useState("")
    //start date
    //end date
    const start= {month: selectedVaca.dFlightM, day: selectedVaca.dFlightD, year: selectedVaca.dFlightY}
    const end = {month: selectedVaca.aFlightM, day: selectedVaca.aFlightD, year: selectedVaca.aFlightY}

    //subtract yy
    const subYear = end.year - start.year
    // const subYear = 1

    //subtract mm
    const subMonth = end.month - start.month
    // const subMonth = 1

    //subtract dd
    const subDay = end.day - start.day

    useEffect(()  =>
    {
        if (subYear==0 && subMonth==0)
        {
            setSections(subDay)
            setWhichDay(end.day-item.aDay)
        }
        else if (subYear==0 && subMonth!==0)
        {
            setSections(Math.round((subMonth*30)/7))
        }
        else
        {
            setSections(Math.round((subYear*365)/30))
        }

    }, [])

    // 2022 - 2022 = 0
    // 07 - 07 = 0
    // 15 - 10 = 5

    //5 sections/days
    
    //if activity in certain day, then marginLeft = 100 
    //variable for 100

    //2022 - 2022 = 0
    // 08 - 07 = 1
    // 13 - 10 = 3

    // => convert months to days
    // 30 days
    // mod by 7
    // 4 sections/weeks

    //2023 - 2022 = 1
    // 08 - 07 = 1
    // 13 - 10 = 3

    // => covert to days
    // 398
    // mod 30 to get months
    //13 sections/months


    //width of line 700
    //divide width of line with sections

    //Math.round(700/sections)
    const sectionLength = Math.round(700/sections)


    //find which section to multiple with
    //if days then multiply with subDay

    const section = sectionLength * whichDay

    // console.log(section)

    //figure out what marginLeft should be using start and end dates
    return (
        <div className="line" style={{marginTop: 80, marginLeft: section + 100}} ></div>
    )
}
export default Line