const settingsReducer = (state = false, action) =>
{
    switch (action.type) 
    {
        case "GOTOSETTINGS":
            return !state;
        default:
            return state;
    }
}

export default settingsReducer;