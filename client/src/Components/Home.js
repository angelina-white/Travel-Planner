import { useState } from "react" 
import VacaName from "./VacaName"
import Information from "./Information"
import Settings from "./Settings"
import Agenda from "./Agenda"
import Chat from "./Chat"
import Timeline from "./Timeline"
import Summary from "./Summary"
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
        const vacation = 
        {
            vacationName: vacationInput,

            dFlightM: "",
            dFlightD: "",
            dFlightY: "",
            dFlightH: "",
            dFlightMin: "",
    
            aFlightM: "",
            aFlightD: "",
            aFlightY: "",
            aFlightH: "",
            aFlightMin: "",
    
            iHotelH: "",
            iHotelM: "",
    
            oHotelH: "",
            oHotelM: ""
        }
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

    function handleNamePatch(data)
    {
        const vacaNamePatch =
        {
            vacationName: data,
            dFlightM: selectedVaca.dFlightM,
            dFlightD: selectedVaca.dFlightD,
            dFlightY: selectedVaca.dFlightY,
            dFlightH: selectedVaca.dFlightH,
            dFlightMin: selectedVaca.dFlightMin,
    
            aFlightM: selectedVaca.aFlightM,
            aFlightD: selectedVaca.aFlightD,
            aFlightY: selectedVaca.aFlightY,
            aFlightH: selectedVaca.aFlightH,
            aFlightMin: selectedVaca.aFlightMin,
    
            iHotelH: selectedVaca.iHotelH,
            iHotelM: selectedVaca.iHotelM,
    
            oHotelH: selectedVaca.oHotelH,
            oHotelM: selectedVaca.oHotelM
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
                    
                    {/* vacation menu */}
                    <Router>
                        {/* <Link to="/settings" className="menuText">Settings</Link> */}
                        <Switch>
                            <Route path="/summary">
                                <Summary selectedVaca={ selectedVaca }/>
                            </Route>
                            <Route path="/editTrip">
                                <Information selectedVaca={ selectedVaca } handleVacaPatch={ handleVacaPatch } handleAddActivity={ handleAddActivity } activitiesList={ activitiesList } setSelectedVaca= { setSelectedVaca } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
                            </Route>
                            <Route path="/agenda">
                                <Agenda selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                            </Route>
                            <Route path="/budget">
                                <h1>budget goes here</h1>
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
                            <Route path="/">
                                <h2 id="selectedName">{ selectedName }</h2>
                                <div>
                                    <p onClick= { () => setIsDetails((isDetails) => isDetails = !isDetails) } id="menuBack">Go back</p>
                                </div>
                                
                                <nav>
                                    <ul id="menuUl">
                                        <li>
                                            <Link to="/summary" className="menuText">
                                                <div className="menuCont">
                                                    Summary
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="menuCont">
                                            <Link to="/editTrip" className="menuText">Edit trip</Link>
                                        </li>
                                        <li>
                                            <Link to="/agenda" className="menuText">
                                                <div className="menuCont">
                                                    Calendar
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/budget" className="menuText">
                                                <div className="menuCont">
                                                    Budget
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/chat" className="menuText">
                                                <div className="menuCont">
                                                    Chat
                                                </div>
                                            </Link>
                                        </li>
                                        <li id="menuTimeline">
                                            {/* <Link to="/timeline" className="menuText">Timeline</Link> */}
                                            <Timeline selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                                        </li>
                                        <li>
                                            <Link to="/settings" className="menuText">
                                                <div className="menuCont">
                                                    Settings
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </Route>
                        </Switch>
                    </Router> 
                </div>
                :
                <div>
                    {/* shows names */}
                    <div id="addVacaCont">
                        <input onChange={ handleVacationInput } placeholder="Enter vacation name..." id="vacaNameInput"></input>
                        <button onClick={ handleAddVacation } id="addVacaButton">Add</button>
                    </div>
                    <div id="namesBackground" />
                    <ul id="vacationListUl">
                        { vacaNameList }
                    </ul>
                </div>
            }     
        </div>
    )
}
export default Home