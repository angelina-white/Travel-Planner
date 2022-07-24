import { useDispatch } from "react-redux";
import { vacation } from "../actions"; //action

function VacaName({ item, clickVacation })
{
    const dispatch = useDispatch();

    function handleClick()
    {
        dispatch(vacation())
        clickVacation(item.id)
    }

    return (
        <li onClick={ handleClick } id="vacaNameCont">
            <h2>{ item.vacationName }</h2>
        </li>
    )
}
export default VacaName