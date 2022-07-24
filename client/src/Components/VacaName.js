import { useDispatch } from "react-redux";
import { vacation } from "../actions"; //action
import luggagePic from "../luggagePic.jpg"

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
            <img src={ luggagePic } id="namePic"/>
            <h2 id="nameText">{ item.vacationName }</h2>
        </li>
    )
}
export default VacaName