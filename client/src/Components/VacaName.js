function VacaName({ item, clickVacation })
{
    function handleClick()
    {
        clickVacation(item.id)
    }

    return (
        <li onClick={ handleClick }>
            <h2>{ item.vacationName }</h2>
        </li>
    )
}
export default VacaName