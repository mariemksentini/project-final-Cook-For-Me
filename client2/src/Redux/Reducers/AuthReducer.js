import { CHECKUSER, CURRENT, FETCHUSERS, GETALLUSERS, GETONEUSER, LOGIN, LOGOUT, REGISTER } from "../ActionTypes/AuthActionTypes"

const initialState = {
    user : {},
    checked : false,
    users : [],
    wantedUser : {},
    useret : [],
    totalPages : 0
}

const AuthReducer =(state = initialState, action)=>{
    switch (action.type) {
        case REGISTER : 
            localStorage.setItem('token', action.payload.token) 
            return {...state, user : action.payload.newUser}

        case LOGIN :
            localStorage.setItem('token', action.payload.token)
            return {...state, user : action.payload.found};

        case CURRENT : 
            return {...state, user : action.payload}
        
        case CHECKUSER : return {...state, checked : !state.checked}

        case LOGOUT : 
            localStorage.removeItem('token')
            return {...state, user : null}

        // admin

        case GETALLUSERS : 
            return {...state, users : action.payload.users}

        case FETCHUSERS :
            return {...state, useret : action.payload.users, totalPages : action.payload.totalPages}
        
        case GETONEUSER : 
            return {...state, wantedUser : action.payload.user}

        
        
        default: return state
    }
}

export default AuthReducer