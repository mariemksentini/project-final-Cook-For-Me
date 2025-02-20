import { DELETEONEFOOD, FETCHFOODS, GETALLFOOD, GETONEFOOD } from "../ActionTypes/FoodTypes"

const initialState = {
    foods : [],
    wantedFood : {},
    foodet : [],
    totalPages : 0
}

const FoodReducer =(state= initialState, action)=>{
    switch (action.type) {
        case GETALLFOOD : 
            return {...state, foods : action.payload.foods}

        case GETONEFOOD : 
            return {...state, wantedFood : action.payload.food}

        case DELETEONEFOOD : 
            return {...state, wantedFood : {}}

        case FETCHFOODS :
            return {...state, foodet : action.payload.foods, totalPages : action.payload.totalPages}
        default: return state
    }
}

export default FoodReducer