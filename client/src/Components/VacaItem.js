function VacaItem({ item })
{
    function handleClick(e)
    {
        console.log("meep")
    }

    return (
        <li onClick={ handleClick }>
            <h2>{ item.vacationName }</h2>
        </li>
    )
}
export default VacaItem