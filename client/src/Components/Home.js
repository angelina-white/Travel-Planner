import { useState } from "react" 
import VacaName from "./VacaName"
import Information from "./Information"
import Settings from "./Settings"
import ActivityItem from "./ActivityItem"
import Agenda from "./Agenda"
import { useSelector, useDispatch } from "react-redux";
import { vacation } from "../actions"; //action
import { goToSettings } from "../actions";
import { updateName } from "../actions"; //action
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function Home({ userId, vacationList, handleAddVaca, handleVacaPatch, handleDeleteVaca, getActivities, activitiesList, handleAddActivity, handleActivityPatch, handleDeleteActivity, userList})
{
    const isDetail = useSelector(state => state.isDetails); //state
    const isSettings = useSelector(state => state.isSettings); //state
    const isVacaName = useSelector(state => state.isVacaName); //state
    const dispatch = useDispatch();

    const [vacationInput, setVacationInput] = useState("")
    function handleVacationInput(e)
    {
        setVacationInput(e.target.value)
    }

    function handleAddVacation()
    {
        const vacation = {vacationName: vacationInput}
        fetch("/vacations", 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vacation)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleAddVaca(data)
            const userVaca = 
            {
                user_id: userId,
                vacation_id: data.id
            }

            fetch("/user_vacations", 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userVaca)
            })
            .then(resp => resp.json())
        })
    }

    const vacaNameList = vacationList.map((item) =>
    {
        return (
            <VacaName item={ item } clickVacation={ clickVacation }/>
        )
    })

    const [selectedVaca, setSelectedVaca] = useState("")
    const [selectedName, setSelectedName] = useState("")

    //where it set isDetails
    function clickVacation(e)
    {
        const findVaca = vacationList.find((item) => item.id == e)

        setSelectedVaca(findVaca)
        setSelectedName(findVaca.vacationName)
        getActivities(e)
    }

    // const [vacaPatch, setVacaPatch] = useState("")

    // function handleEditVaca(e)
    // {
    //     setVacaPatch(e.target.value)
    // }

    // function submitEditVaca(e)
    // {
    //     const vacaPatchData =
    //     {
    //         vacationName: vacaPatch,
    //         flightToArrive: "",
    //         flightToLeave: "",
    //         hotelCheckIn: "",
    //         hotelCheckOut: ""
    //     }


    //     fetch(`/vacations/${selectedVaca.id}`,
    //     {
    //         method: "PATCH",
    //         headers:
    //         {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(vacaPatchData)
    //     })
    //     .then(resp => resp.json())
    //     .then(data => 
    //     {
    //         handleVacaPatch(data)
    //         // setIsEdit(false)
    //     })
    // }

    // function deleteVaca()
    // {
    //     fetch(`/vacations/${selectedVaca.id}`, {
    //         method: "DELETE",
    //       })
    //     .then((res) => res.json())
    //     .then((data) => handleDeleteVaca(data));
    // }


    const [vacaDetails, setVacaDetails] = useState({flightToArrive: "", flightToLeave: "", hotelCheckIn: "", hotelCheckOut: ""})

    function handleDetailInput(e)
    {
        setVacaDetails({...vacaDetails, [e.target.name]: e.target.value})
    }

    function handleNamePatch(data)
    {
        const vacaNamePatch =
        {
            vacationName: data,
            flightToArrive: vacaDetails.flightToArrive,
            flightToLeave: vacaDetails.flightToLeave,
            hotelCheckIn: vacaDetails.hotelCheckIn,
            hotelCheckOut: vacaDetails.hotelCheckOut
        }

        fetch(`/vacations/${selectedVaca.id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vacaNamePatch)
        })
        .then(resp => resp.json())
        .then(data => 
        {
            handleVacaPatch(data)
        })
    }

    return (
        <div id="home">
            { isDetail ?
                <div>
                    {/* shows names */}
                    <input onChange={ handleVacationInput }></input>
                    <button onClick={ handleAddVacation }>Add vacation</button>
                    <ul>
                        { vacaNameList }
                    </ul>
                </div>
            :
                <div>
                    {/* showsdetails */}
                    <h1>{ selectedName }</h1>
                    <button onClick= { () => dispatch(vacation()) }>Go back</button>
                    
                    {/* vacation menu */}
                    <Router>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/homepage">Homepage</Link>
                                </li>
                                <li>
                                    <Link to="/tripInfo">Trip info</Link>
                                </li>
                                <li>
                                    <Link to="/agenda">Calendar</Link>
                                </li>
                                <li>
                                    <Link to="/helper">Planning Helper</Link>
                                </li>
                                <li>
                                    <Link to="/chat">Chat</Link>
                                </li>
                                <li>
                                    <Link to="/timeline">Timeline</Link>
                                </li>
                                <li>
                                    <Link to="/settings">Settings</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route path="/homepage">
                                <h1>Nothing selected</h1>
                            </Route>
                            <Route path="/tripInfo">
                                <Information selectedVaca={ selectedVaca } handleVacaPatch={ handleVacaPatch } handleAddActivity={ handleAddActivity } activitiesList={ activitiesList } setSelectedVaca= { setSelectedVaca }/>
                            </Route>
                            <Route path="/agenda">
                                <Agenda />
                            </Route>
                            <Route path="/helper">
                                <h1>Helper</h1>
                            </Route>
                            <Route path="/chat">
                                <h1>Chat</h1>
                            </Route>
                            <Route path="/timeline">
                                <h1>Timeline</h1>
                            </Route>
                            <Route path="/settings">
                                <Settings handleNamePatch={ handleNamePatch } setSelectedName={ setSelectedName } userList={ userList } selectedVaca={ selectedVaca } handleDeleteVaca={ handleDeleteVaca }/>
                            </Route>
                        </Switch>
                    </Router> 
                </div>
            }     




            {/* { isDetail ?
                <div>
                    { selectedName }
                    <button onClick= { () => dispatch(vacation()) }>Go back</button>
                    <h2>Vacation Details</h2>
                    { isSettings ?
                        <div>
                            <button onClick={ () => dispatch(goToSettings()) }>Go back</button>
                            <Settings handleNamePatch={ handleNamePatch } setSelectedName={ setSelectedName } userList={ userList } selectedVaca={ selectedVaca }/>
                        </div>
                    :
                        <div>
                            <button onClick={ () => dispatch(goToSettings()) }>Settings</button>
                            <h1>not settings</h1>
                        </div>
                    } */}
                    {/* { isVacaName ?
                        <div>
                            <button onClick={ () => dispatch(updateName()) }>Unedit</button>
                            <input onChange={ handleEditVaca }/>
                            <button onClick={ submitEditVaca }>Submit</button>
                            <button onClick={ deleteVaca }>Delete</button>
                        </div>
                    :
                        <div>
                            <button onClick={ () => dispatch(updateName()) }>Edit</button>
                            // { selectedVaca.vacationName }
                            { selectedVaca.id }
                            <form onSubmit={ submitVacaDetails}>
                                <label>
                                    Departing flight:
                                    <input name="flightToArrive" onChange={ handleDetailInput } placeholder="yyyy/mm/dd"/>
                                </label>
                                <label>
                                    Arriving flight:
                                    <input name="flightToLeave" onChange={ handleDetailInput } placeholder="yyyy/mm/dd"/>
                                </label>
                                <label>
                                    Hotel check-in:
                                    <input name="hotelCheckIn" onChange={ handleDetailInput } placeholder="Enter..."/>
                                </label>
                                <label>
                                    Hotel check-outd:
                                    <input name="hotelCheckOut" onChange={ handleDetailInput } placeholder="Enter..."/>
                                </label>
                                <button>Submit</button>
                            </form>

                            <h5>Departing flight: { selectedVaca.flightToArrive }</h5>
                            <h5>Arrive flight: { selectedVaca.flightToLeave }</h5>
                            <h5>Hotel check-in: { selectedVaca.hotelCheckIn }</h5>
                            <h5>Hotel check-out: { selectedVaca.hotelCheckOut }</h5>

                            <h2>Activities</h2>
                            <h3>Add activity</h3>
                            <label>
                                Activity name:
                                <input onChange={ handleActivityInput }/>
                                <button onClick={ submitActivity }>Submit</button>
                            </label>
                        
                            <ul>
                                { dispActivities }
                            </ul>
                        </div>
                    } */}
                {/* </div>
            :
                <div>
                    <input onChange={ handleVacationInput }></input>
                    <button onClick={ handleAddVacation }>Add vacation</button>
                    <ul>
                        { vacaNameList }
                    </ul>
                </div>
            } */}
        </div>
    )
}
export default Home