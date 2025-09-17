const initialState = {count:0}

function CounterReducer(state = initialState, action){

    switch(action.type){
        case "Increment":
            return {...state, count:state+1}
        case "Decrement":
            return {...state, count:state-1}
        case "Reset":
            return {...state, count:0}
            default:
                return state
    }
}

export default CounterReducer