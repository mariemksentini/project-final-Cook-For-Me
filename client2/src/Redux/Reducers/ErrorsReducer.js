import { CLEARERROR, HANDLEERROR } from "../ActionTypes/ErrorsActionTypes";

const initialState = []

const ErrorsReducer =(state =  initialState, action)=>{
    switch (action.type) {
        case HANDLEERROR:
            return [...state, action.payload]
        
        case CLEARERROR : 
            return state.filter((element)=> element.id !== action.payload)
        default: 
            return state
    }
}

export default ErrorsReducer