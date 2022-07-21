const initialState = {
    vacations: [],
  };
  
  export default function vacaReducer(state = initialState, action) {
    switch (action.type) {
      case "vaca/add":
        return {
          vacations: [...state.vacations, action.payload],
        };
  
      default:
        return state;
    }
  }