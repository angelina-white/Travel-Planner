import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

function ActivityItem({ item, handleActivityPatch, handleDeleteActivity})
{
    const [actDate, setActDate] = useState("")
    const [actTime, setActTime] = useState("")
    useEffect(() =>
    {
        //date
        if (item.aMonth == null || item.aDay == null || item.aYear == null)
        {
            setActDate("")
        }
        else
        {
            setActDate(`Date: ${item.aMonth}/${item.aDay}/${item.aYear}`)
        }

        //time
        if (item.aHour == null || item.aMinute == null)
        {
            setActTime("")
        }
        else if (item.aMinute == 0)
        {
            setActTime(`Time: ${item.aHour}:00`)
        }
        else
        {
            setActTime(`Time: ${item.aHour}:${item.aMinute}`)
        }
    })

    const [isEdit, setIsEdit] = useState(false)
    const [activity, setActivity] = useState(
        {
            activityName: item.activityName,
            aMonth: item.aMonth,
            aDay: item.aDay,
            aYear: item.aYear,
            aHour: item.aHour,
            aMinute: item.aMinute
        })

    function handleEdit(e)
    {
        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    function handleActivityInput(e)
    {
        setActivity({...activity, [e.target.name]: e.target.value})
    }

    function handleSubmit()
    {
        const patchData =
        {
            activityName: activity.activityName,
            aMonth: parseInt(activity.aMonth),
            aDay: parseInt(activity.aDay),
            aYear: parseInt(activity.aYear),
            aHour: parseInt(activity.aHour),
            aMinute: parseInt(activity.aMinute)
        }

        fetch(`/activities/${item.id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patchData)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleActivityPatch(data)
        })
    }

    function handleDelete()
    {
        console.log(item.id)
        fetch(`/activities/${item.id}`, {
            method: "DELETE",
          })
        .then((res) => res.json())
        .then((data) => 
        {
            console.log(data)
            handleDeleteActivity(data)
        });
    }

    const date = `${item.aMonth}/${item.aDay}/${item.aYear}`
    const time = `${item.aHour}:${item.aMinute}`

    return (
        <li>
            {isEdit ?
                <div>
                    <input name="activityName" onChange={ handleActivityInput } placeholder="Enter name..."/>
                    <input name="aMonth" onChange={ handleActivityInput } placeholder="mm"/>
                    <input name="aDay" onChange={ handleActivityInput } placeholder="dd"/>
                    <input name="aYear" onChange={ handleActivityInput } placeholder="yyyy"/>
                    <input name="aHour" onChange={ handleActivityInput } placeholder="hh"/>
                    <input name="aMinute" onChange={ handleActivityInput } placeholder="mm"/>
                    <div id="editActButtons">
                        <Button onClick={ handleEdit } className="editAct3" id="unedit">Unedit</Button>
                        <Button onClick={ handleSubmit } className="editAct3" id="unedit">Submit</Button>
                        <Button onClick= { handleDelete } className="editAct3" id="unedit">Delete</Button>
                    </div>
                    
                </div>
            :
                <div>
                    <h4>{ item.activityName }</h4>
                    <p>{ actDate }</p>
                    <p>{ actTime }</p>
                    <Button onClick={ handleEdit } id="editActivities"> Edit</Button>
                </div>
            }
        </li>
    )
}
export default ActivityItem