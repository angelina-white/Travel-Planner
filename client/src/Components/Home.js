import { useState } from "react" 
import VacaName from "./VacaName"
import Information from "./Information"
import Settings from "./Settings"
import Agenda from "./Agenda"
import Chat from "./Chat"
import Timeline from "./Timeline"
import { useSelector, useDispatch } from "react-redux";
import { vacation } from "../actions"; //action
import { goToSettings } from "../actions";
import { updateName } from "../actions"; //action
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function Home({ userId, username, vacationList, handleAddVaca, handleVacaPatch, handleDeleteVaca, getActivities, activitiesList, handleAddActivity, handleActivityPatch, handleDeleteActivity, userList})
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
            .then((data) => console.log(data))
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
        setIsDetails(true)
    }

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

    const [isDetails, setIsDetails] = useState(false)

    return (
        <div id="home">
            { isDetails ?
                <div>
                    {/* showsdetails */}
                    <h1>{ selectedName }</h1>
                    <button onClick= { () => setIsDetails((isDetails) => isDetails = !isDetails) }>Go back</button>
                    
                    {/* vacation menu */}
                    {/* when click on item, styling changes, use toggle */}
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
                                <Information selectedVaca={ selectedVaca } handleVacaPatch={ handleVacaPatch } handleAddActivity={ handleAddActivity } activitiesList={ activitiesList } setSelectedVaca= { setSelectedVaca } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
                            </Route>
                            <Route path="/agenda">
                                <Agenda selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                            </Route>
                            <Route path="/helper">
                                <h1>Helper</h1>
                            </Route>
                            <Route path="/chat">
                                <Chat username={ username }/>
                            </Route>
                            <Route path="/timeline">
                                <Timeline selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                            </Route>
                            <Route path="/settings">
                                <Settings handleNamePatch={ handleNamePatch } setSelectedName={ setSelectedName } userList={ userList } selectedVaca={ selectedVaca } handleDeleteVaca={ handleDeleteVaca }/>
                            </Route>
                        </Switch>
                    </Router> 
                </div>
                :
                <div>
                    {/* shows names */}
                    <input onChange={ handleVacationInput }></input>
                    <button onClick={ handleAddVacation }>Add vacation</button>
                    <ul>
                        { vacaNameList }
                    </ul>
                </div>
            }     
        </div>
    )
}
export default Home