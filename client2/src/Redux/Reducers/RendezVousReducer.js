import { ADDRENDEZVOUS, GETALLRENDEZVOUSS, GETONECHEFRENDEZVOUS, GETONERENDEZVOUS } from "../ActionTypes/RendezVousTypes"

const initialState = {
    rendezVouss : [],
    oneRendezVous : {},
    chefRendezVouss : []
}

const rendezVousReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GETALLRENDEZVOUSS : return {
            ...state, rendezVouss : action.payload.rendezvouss
        }
        case ADDRENDEZVOUS : return {
            ...state, oneRendezVous : action.payload.rendezVous
        }

        case GETONECHEFRENDEZVOUS : return {
            ...state, chefRendezVouss : action.payload
        }

        case GETONERENDEZVOUS : return {
            ...state, oneRendezVous : action.payload
        }
        default: return state
    }
}

export default rendezVousReducer