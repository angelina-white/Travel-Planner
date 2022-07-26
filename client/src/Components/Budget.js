import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";

function Budget({ selectedVaca, budgetList })
{
    console.log(budgetList)

    const [hotelInput, setHotelInput] = useState(budgetList.hotel)
    const [flightInput, setFlightInput] = useState(budgetList.flight)
    const [activitiesInput, setActivitiesInput] = useState(budgetList.activities)
    const [foodInput, setFoodInput] = useState(budgetList.food)
    const [shoppingInput, setShoppingInput] = useState(budgetList.shopping)
    const [miscInput, setMiscInput] = useState(budgetList.misc)

    function handleSubmit(e)
    {
        e.preventDefault()
        const data =
        {
            hotel: hotelInput,
            flight: flightInput,
            activities: activitiesInput,
            food: foodInput,
            shopping: shoppingInput,
            misc: miscInput,
            vacation_id: selectedVaca.id
        }

        fetch(`/budgets/${ budgetList.id }`, 
        {
            method: 'PATCH',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <h2 id="budgetTitle">Budget goes myere</h2>
            <Table striped bordered hover id="budgetTable">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hotel</td>
                        <td>$
                            <input placeholder="Enter..." value={ hotelInput } onChange={ (e) => setHotelInput(e.target.value) }/>
                        </td>
                    </tr>
                    <tr>
                        <td>Flight</td>
                        <td>$
                            <input placeholder="Enter..." value={ flightInput } onChange={ (e) => setFlightInput(e.target.value) }/>
                        </td>
                    </tr>
                    <tr>
                        <td>Activities</td>
                        <td>$
                            <input placeholder="Enter..." value={ activitiesInput } onChange={ (e) => setActivitiesInput(e.target.value) }/>
                        </td>
                    </tr>
                    <tr>
                        <td>Food</td>
                        <td>$
                            <input placeholder="Enter..." value={ foodInput } onChange={ (e) => setFoodInput(e.target.value) }/>
                        </td>
                    </tr>
                    <tr>
                        <td>Shopping</td>
                        <td>$
                            <input placeholder="Enter..." value={ shoppingInput } onChange={ (e) => setShoppingInput(e.target.value) }/>
                        </td>
                    </tr>
                    <tr>
                        <td>Misc</td>
                        <td>$
                            <input placeholder="Enter..." value={ miscInput } onChange={ (e) => setMiscInput(e.target.value) }/>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={ handleSubmit }>Submit</Button>
        </div>
    )
}
export default Budget