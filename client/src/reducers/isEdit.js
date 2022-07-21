const vacaNameReducer = (state = false, action) =>
{
    switch (action.type) 
    {
        case "UPDATENAME":
            return !state;
        default:
            return state;
    }
}

export default vacaNameReducer;