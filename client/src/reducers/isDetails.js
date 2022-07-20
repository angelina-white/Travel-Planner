const detailReducer = (state = false, action) =>
{
    switch (action.type) 
    {
        case "VACATION":
            return !state;
        default:
            return state;
    }
}

export default detailReducer;