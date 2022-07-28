import { useEffect, useState } from "react"

function Line({ item, selectedVaca })
{
    const [sections, setSections] = useState("")
    const [dest, setDest] = useState("")

    //start and end date
    const start= {month: selectedVaca.dFlightM, day: selectedVaca.dFlightD, year: selectedVaca.dFlightY}
    const end = {month: selectedVaca.aFlightM, day: selectedVaca.aFlightD, year: selectedVaca.aFlightY}

    // 2022 - 2022 = 0
    // 07 - 07 = 0
    // 15 - 10 = 5

    //5 sections/days

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

    //subtract yy/mm/dd
    const subYear = end.year - start.year
    const subMonth = end.month - start.month
    const subDay = end.day - start.day

    useEffect(()  =>
    {
        if (subYear==0 && subMonth==0)
        {
            setSections(subDay + 1)
            const part = item.aDay - start.day
            console.log(item.aDay)
            console.log(start.day)
            setDest(part)
        }
        else if (subYear==0 && subMonth!==0)
        {
            setSections((Math.round(((subMonth*30)+subDay)/7)) + 1)

            //which week
            //08/15
            //07/10
            //sections = 5 (weeks)

            //which week is 7/14 (should be the first week)
            //8/15-7/14 = 1 month & 1 day = 31 days

            //item= 07/23 (should be second week)
            //8/15 - 7/23 = a month & -8 days

            //item= 07/30 (should be third week)
            //8/15-7/30 = 1 month & -15 days = 15 days

            //item= 08/7 (should be fourth week)
            //8/15-8/7 = 8 days

            //item= 08/14 (should be fifth week)
            //8/15-8/14 = 1 day 

            const months = end.month - item.aMonth
            const days = end.day - item.aDay
            const total = (months * 30) + days
            console.log(total)

            if (total <= 7)
            {
                setDest(Math.abs(sections))
                console.log("hit < 7")
            }
            else if (total > 7 && total <= 14)
            {
                const part = Math.abs(sections - 1)
                setDest(part)
                console.log("hit 7-14")
            }
            else if (total > 14 && total <= 21)
            {
                const part = Math.abs(sections - 2)
                setDest(part)
                console.log("hit 14-21")
            }
            else if (total > 21 && total <= 28)
            {
                const part = Math.abs(sections - 3)
                setDest(part)
                console.log("hit 21-28")
            }
            else if (total > 28 && total <= 35)
            {
                const part = Math.abs(sections - 4)
                setDest(part)
                console.log("hit 28-35")
            }
            else{
                console.log("rock bottom")
            }
        }
        else
        {
            setSections(Math.round(((subYear*365)+(subMonth*30)+(subDay))/30))
        }
    }, [])

    console.log(`dest ${dest}`)


    //width of line 700
    //divide width of line with sections
    // console.log(`sections ${sections}`)
    const sectionLength = Math.round(700/sections)
    // console.log(`sectionlength ${sectionLength}`)

    //find which section to multiple with
    const section = (sectionLength * dest) + 100
    // console.log(`section ${section}`)

    //figure out what marginLeft should be using start and end dates
    return (
        <div className="line" style={{marginTop: 80, marginLeft: section}} ></div>
    )
}
export default Line