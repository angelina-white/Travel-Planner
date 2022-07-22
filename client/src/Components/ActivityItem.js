import { useState } from "react";

function ActivityItem({ item, handleActivityPatch, handleDeleteActivity})
{
    const [isEdit, setIsEdit] = useState(false)
    const [activityInput, setActivityInput] = useState("")

    function handleEdit(e)
    {
        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    function handleActivityInput(e)
    {
        setActivityInput(e.target.value)
    }

    function handleSubmit()
    {
        const patchData =
        {
            activityName: activityInput
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
        fetch(`/activities/${item.id}`, {
            method: "DELETE",
          })
        .then((res) => res.json())
        .then((data) => handleDeleteActivity(data));
    }

    const date = `${item.aMonth}/${item.aDay}/${item.aHour}`
    const time = `${item.aHour}:${item.aMinute}`

    //need inputs for data and time for activities

    return (
        <li>
            {isEdit ?
                <div>
                    <input onChange={ handleActivityInput } placeholder="Enter..." />
                    <button onClick={ handleEdit }>Unedit</button>
                    <button onClick={ handleSubmit }>Submit</button>
                    <button onClick= { handleDelete }>Delete</button>
                </div>
            :
                <div>
                    <h4>{ item.activityName }</h4>
                    <p>Date: { date }</p>
                    <p>Time: { time }</p>
                    <button onClick={ handleEdit }> Edit</button>
                </div>
            }
        </li>
    )
}
export default ActivityItem