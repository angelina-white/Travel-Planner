import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import Slider from '@mui/material/Slider';
import Chart from "react-apexcharts";
import Dropdown from 'react-bootstrap/Dropdown';

function Budget({ selectedVaca, budgetList, updateBudget })
{
    const [highest, setHighest] = useState(Math.max(budgetList.hotel, budgetList.flight, budgetList.activities, budgetList.food, budgetList.shopping, budgetList.misc))
    const [hotelInput, setHotelInput] = useState(budgetList.hotel)
    const [flightInput, setFlightInput] = useState(budgetList.flight)
    const [activitiesInput, setActivitiesInput] = useState(budgetList.activities)
    const [foodInput, setFoodInput] = useState(budgetList.food)
    const [shoppingInput, setShoppingInput] = useState(budgetList.shopping)
    const [miscInput, setMiscInput] = useState(budgetList.misc)
    const [total, setTotal] = useState(budgetList.hotel + budgetList.flight + budgetList.activities + budgetList.food + budgetList.shopping + budgetList.misc)

    function handleSubmit(e)
    {
        e.preventDefault()
        const sendData =
        {
            hotel: parseInt(hotelInput),
            flight: parseInt(flightInput),
            activities: parseInt(activitiesInput),
            food: parseInt(foodInput),
            shopping: parseInt(shoppingInput),
            misc: parseInt(miscInput),
            vacation_id: selectedVaca.id
        }

        fetch(`/budgets/${ budgetList.id }`, 
        {
            method: 'PATCH',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            setTotal(parseInt(sendData.hotel) + parseInt(sendData.flight) + parseInt(sendData.activities) + parseInt(sendData.food) + parseInt(sendData.shopping) + parseInt(sendData.misc))
            setHighest(Math.max(parseInt(sendData.hotel), parseInt(sendData.flight), parseInt(sendData.activities), parseInt(sendData.food), parseInt(sendData.shopping), parseInt(sendData.misc)))
            updateBudget(sendData)
        })
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

    //1 person
    const options1= 
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

    //1 person
    const series1= 
    [{
        data: [budgetList.hotel, budgetList.flight, budgetList.activities, budgetList.food, budgetList.shopping, budgetList.misc]
    }]


    function handleSlideChange(e)
    {
        setSliderHalf1(e.target.value)
        setSliderHalf2(100 - sliderHalf1)

        const perc1 = (sliderHalf1 * .01)
        const perc2 = (sliderHalf2 * .01)

        setFirstChart(
        {
            hotel: Math.round((budgetList.hotel * perc1)),
            flight: Math.round((budgetList.flight * perc1)),
            activities: Math.round((budgetList.activities * perc1)),
            food: Math.round((budgetList.food * perc1)),
            shopping: Math.round((budgetList.shopping * perc1)),
            misc: Math.round((budgetList.misc * perc1))
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

    //2 people, first
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

    //2 people, first
    const series= 
    [{
        data: [firstChart.hotel, firstChart.flight, firstChart.activities, firstChart.food, firstChart.shopping, firstChart.misc]
    }]

    //2 people, second
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

    //2 people, second
    const series2= 
    [{
        data: [secondChart.hotel, secondChart.flight, secondChart.activities, secondChart.food, secondChart.shopping, secondChart.misc]
    }]

    const [dropName, setDropName] = useState("1 person")
    const [is1, setIs1] = useState(true)
    const [is2, setIs2] = useState(false)

    function handle1()
    {
        setIs1(true)
        setIs2(false)
        setDropName(("1 person"))
    }

    function handle2()
    {
        setIs2(true)
        setIs1(false)
        setDropName(("2 people"))
    }

    return (
        <div>
            <h2 id="budgetTitle">Budget</h2>

            <div id="budgetTableCont">
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
                                <input className="budgetInput" placeholder="Enter..." value={ hotelInput } onChange={ (e) => setHotelInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Flight</td>
                            <td>$
                                <input className="budgetInput" placeholder="Enter..." value={ flightInput } onChange={ (e) => setFlightInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Activities</td>
                            <td>$
                                <input className="budgetInput" placeholder="Enter..." value={ activitiesInput } onChange={ (e) => setActivitiesInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td>$
                                <input className="budgetInput" placeholder="Enter..." value={ foodInput } onChange={ (e) => setFoodInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Shopping</td>
                            <td>$
                                <input className="budgetInput" placeholder="Enter..." value={ shoppingInput } onChange={ (e) => setShoppingInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Misc</td>
                            <td>$
                                <input className="budgetInput" placeholder="Enter..." value={ miscInput } onChange={ (e) => setMiscInput(e.target.value) }/>
                            </td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>${ total }</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={ handleSubmit } id="submitBudget">Submit</Button>
            </div>

            <div id="chartCont">
                <Dropdown id="budgetDropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        { dropName }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ handle1 }>1 person</Dropdown.Item>
                        <Dropdown.Item onClick={ handle2 }>2 people</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {is1?
                    <div id="singleChart">
                        <Chart
                            options={ options1 }
                            series={ series1 }
                            type="bar"
                            width={ 500 }
                        />
                    </div>
                :
                    <div>
                    </div>
                }

                {is2?
                    <div>
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
                            <div id="barChartRight">
                                <Chart
                                    options={ options2 }
                                    series={ series2 }
                                    type="bar"
                                    width={ 500 }
                                />
                            </div>
                        </div>
                    </div>
                :
                    <div>
                    </div>
                }
            </div>
        </div>
    )
}
export default Budget

