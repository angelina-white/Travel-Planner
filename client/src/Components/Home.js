import { useState } from "react" 
import VacaName from "./VacaName"
import Information from "./Information"
import Settings from "./Settings"
import Agenda from "./Agenda"
import Chat from "./Chat"
import Timeline from "./Timeline"
import Summary from "./Summary"
import Budget from "./Budget"
import { useSelector, useDispatch } from "react-redux";
import { vacation } from "../actions"; //action
import { goToSettings } from "../actions";
import { updateName } from "../actions"; //action
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import chatPic from "../chatPic.jpg"
import calendarPic from "../calendarPic.jpg"
import budgetPic from "../budgetPic.jpg"
import summaryPic from "../summaryPic.jpg"
import settingsPic from "../settingsPic.jpg"
import settingsPic3 from "../settingsPic3.jpg"


function Home({ userId, username, vacationList, handleAddVaca, handleVacaPatch, handleDeleteVaca, getActivities, activitiesList, handleAddActivity, handleActivityPatch, handleDeleteActivity, userList, getBudgets, budgetList})
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
            const budgetData =
            {
                hotel: "",
                flight: "",
                activities: "",
                food: "",
                shopping: "",
                misc: "",
                vacation_id: data.id
            }
    
            fetch("/budgets", 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(budgetData)
            })
            .then(resp => resp.json())
            .then(data => console.log(data))


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
        getBudgets(e)
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
    const [isSummary, setIsSummary] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isCalendar, setIsCalendar] = useState(false)
    const [isBudget, setIsBudget] = useState(false)
    const [isChat, setIsChat] = useState(false)
    const [isSettings2, setIsSettings2] = useState(false)

    function showSummary()
    {
        setIsSummary((isSummary) => isSummary = !isSummary)
    }

    function showEdit()
    {
        setIsEdit((isEdit) => isEdit = !isEdit)
    }

    function showCalendar()
    {
        setIsCalendar((isCalendar) => isCalendar = !isCalendar)
    }

    function showBudget()
    {
        setIsBudget((isBudget) => isBudget = !isBudget)
    }

    function showChat()
    {
        setIsChat((isChat) => isChat = !isChat)
    }

    function showSettings()
    {
        setIsSettings2((isSettings2) => isSettings2 = !isSettings2)
    }

    return (
        <div id="home">
            { isDetails ?
                <div>
                    {/* showsdetails */}
                    <h2 id="selectedName">{ selectedName }</h2>

                    {isSummary ? 
                        <div>
                            <p onClick= { showSummary } id="summaryBack">Go back</p>
                            <Summary selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                        </div>
                    :
                        <div>
                            {isEdit ?
                                <div>
                                    <p onClick= { showEdit } id="summaryBack">Go back</p>
                                    <Information selectedVaca={ selectedVaca } handleVacaPatch={ handleVacaPatch } handleAddActivity={ handleAddActivity } activitiesList={ activitiesList } setSelectedVaca= { setSelectedVaca } handleActivityPatch={ handleActivityPatch } handleDeleteActivity={ handleDeleteActivity }/>
                                </div>
                            :
                                <div>
                                    {isCalendar ?
                                        <div>
                                            <p onClick= { showCalendar } id="summaryBack">Go back</p>
                                            <Agenda selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                                        </div>
                                    :
                                        <div>
                                            {isBudget ?
                                                <div>
                                                    <p onClick= { showBudget } id="summaryBack">Go back</p>
                                                    <Budget selectedVaca={ selectedVaca } budgetList={ budgetList }/>
                                                </div>
                                            :
                                                <div>
                                                    {isChat ?
                                                        <div>
                                                            <Chat username={ username } showChat={ showChat }/>
                                                        </div>
                                                    :
                                                        <div>
                                                            {isSettings2 ?
                                                                <div>
                                                                    <p onClick= { showSettings } id="summaryBack">Go back</p>
                                                                    <Settings handleNamePatch={ handleNamePatch } setSelectedName={ setSelectedName } userList={ userList } selectedVaca={ selectedVaca } handleDeleteVaca={ handleDeleteVaca }/>
                                                                </div>
                                                            :
                                                                <div>
                                                                    <div>
                                                                    <p onClick= { () => setIsDetails((isDetails) => isDetails = !isDetails) } id="menuBack">Go back</p>
                                                                </div>

                                                                <ul id="menuUl">
                                                                    <li>
                                                                        <div to="/summary" onClick={ showSummary }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ summaryPic } className="menuPic"/>
                                                                                </div>
                                                                                <h1 className="menuText">Summary</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li >
                                                                        <div to="/editTrip" onClick={ showEdit }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ settingsPic } className="menuPic"/>
                                                                                </div>
                                                                                <h1 className="menuText">Edit Trip</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div to="/agenda" onClick={ showCalendar }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ calendarPic } className="menuPic"/>
                                                                                </div>
                                                                                <h1 className="menuText">Calendar</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div to="/budget" onClick={ showBudget }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ budgetPic } className="menuPic" />
                                                                                </div>
                                                                                <h1 className="menuText">Budget</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div to="/chat" onClick={ showChat }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ chatPic } className="menuPic"/>
                                                                                </div>
                                                                                <h1 className="menuText">Chat</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div to="/settings" onClick={ showSettings }>
                                                                            <div className="menuCont">
                                                                                <div className="imageCont">
                                                                                    <img src={ settingsPic3 } className="menuPic" />
                                                                                </div>
                                                                                <h1 className="menuText">Settings</h1>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li id="menuTimeline">
                                                                        <Timeline selectedVaca={ selectedVaca } activitiesList={ activitiesList }/>
                                                                    </li>
                                                                </ul>
                                                                </div>
                                                            }
                                                        
                                                        </div>
                                                    }
                                                    
                                                </div>
                                            }
                                            
                                        </div>
                                    }
                                </div>
                            }
                           
                        </div>
                    }
                </div>
                :
                <div id="tripNamesCont">
                    {/* shows names */}
                    <h2 id="tripText">Trips</h2>
                    <div id="addVacaCont">
                        <input onChange={ handleVacationInput } placeholder="Enter vacation name..." id="vacaNameInput"></input>
                        <Button onClick={ handleAddVacation } id="addVacaButton">Add</Button>
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