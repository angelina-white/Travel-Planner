import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import Slider from '@mui/material/Slider';
import Chart from "react-apexcharts";

function Budget({ selectedVaca, budgetList })
{

    const highest = (Math.max(budgetList.hotel, budgetList.flight, budgetList.activities, budgetList.food, budgetList.shopping, budgetList.misc))

    const [hotelInput, setHotelInput] = useState(budgetList.hotel)
    const [flightInput, setFlightInput] = useState(budgetList.flight)
    const [activitiesInput, setActivitiesInput] = useState(budgetList.activities)
    const [foodInput, setFoodInput] = useState(budgetList.food)
    const [shoppingInput, setShoppingInput] = useState(budgetList.shopping)
    const [miscInput, setMiscInput] = useState(budgetList.misc)

    const total = budgetList.hotel + budgetList.flight + budgetList.activities + budgetList.food + budgetList.shopping + budgetList.misc

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

    const [sliderHalf1, setSliderHalf1] = useState(50)
    const [sliderHalf2, setSliderHalf2] = useState(50)
    const [firstChart, setFirstChart] = useState(
    {
        hotel: (budgetList.hotel * .5),
        flight: (budgetList.flight * .5),
        activities: (budgetList.activities * .5),
        food: (budgetList.food * .5),
        shopping: (budgetList.shopping * .5),
        misc: (budgetList.misc * .5)
    })
    const [secondChart, setSecondChart] = useState(
    {
        hotel: (budgetList.hotel * .5),
        flight: (budgetList.flight * .5),
        activities: (budgetList.activities * .5),
        food: (budgetList.food * .5),
        shopping: (budgetList.shopping * .5),
        misc: (budgetList.misc * .5)
    })

    function handleSlideChange(e)
    {
        setSliderHalf1(e.target.value)
        setSliderHalf2(100 - sliderHalf1)

        const perc1 = (sliderHalf1 * .01)
        const perc2 = (sliderHalf2 * .01)

        setFirstChart(
        {
            hotel: (budgetList.hotel * perc1),
            flight: (budgetList.flight * perc1),
            activities: (budgetList.activities * perc1),
            food: (budgetList.food * perc1),
            shopping: (budgetList.shopping * perc1),
            misc: (budgetList.misc * perc1)
        })

        setSecondChart(
        {
            hotel: (budgetList.hotel * perc2),
            flight: (budgetList.flight * perc2),
            activities: (budgetList.activities * perc2),
            food: (budgetList.food * perc2),
            shopping: (budgetList.shopping * perc2),
            misc: (budgetList.misc * perc2)
        })

    }

    const options= 
    {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: 
        {
            bar: 
            {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: 
        {
            enabled: false
        },
        xaxis: 
        {
            categories: ['Hotel', 'Flight', 'Activities', 'Food', 'Shopping', 'Misc'],
        },
        yaxis:
        {
            max: highest
        }
    }

    const series= 
    [{
        data: [firstChart.hotel, firstChart.flight, firstChart.activities, firstChart.food, firstChart.shopping, firstChart.misc]
    }]



    const options2= 
    {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: 
        {
            bar: 
            {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: 
        {
            enabled: false
        },
        xaxis: 
        {
            categories: ['Hotel', 'Flight', 'Activities', 'Food', 'Shopping', 'Misc'],
        },
        yaxis:
        {
            max: highest
        }
    }

    const series2= 
    [{
        data: [secondChart.hotel, secondChart.flight, secondChart.activities, secondChart.food, secondChart.shopping, secondChart.misc]
    }]

    return (
        <div>
            <h2 id="budgetTitle">Budget</h2>
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
                    <tr>
                        <td>Total</td>
                        <td>${ total }</td>
                    </tr>
                </tbody>
            </Table>
            <Button onClick={ handleSubmit }>Submit</Button>

            <div id="sliderCont">
                <h5 id="half1">{ sliderHalf1 }%</h5>
                <Slider value={ sliderHalf1 } aria-label="Default" id="budgetSlider" onChange={ handleSlideChange }/>
                <h5 id="half2">{ sliderHalf2 }%</h5>
            </div>
            
            <div id="barCharts">
                <div id="barChartLeft">
                    <Chart
                        options={ options }
                        series={ series }
                        type="bar"
                        width={ 500 }
                    />
                </div>
                <div id="barCharRight">
                    <Chart
                        options={ options2 }
                        series={ series2 }
                        type="bar"
                        width={ 500 }
                    />
                </div>
            </div>
        </div>
    )
}
export default Budget

