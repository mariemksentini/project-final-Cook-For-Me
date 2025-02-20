import { GETALLREQUESTS, SENDREQUESTTOADMIN } from "../ActionTypes/AdminReqTypes"

const initialState = {
    newReq : {},
    allReqs : []
}

const AdminReqReducer =(state = initialState, action)=>{
    switch (action.type) {
        case SENDREQUESTTOADMIN : 
            return {...state, newReq : action.payload.newReq}

            case GETALLREQUESTS : 
                return {...state, allReqs : action.payload.requests}
        default: return state
    }
}

export default AdminReqReducer