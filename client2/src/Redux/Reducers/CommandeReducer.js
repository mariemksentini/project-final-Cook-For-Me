import { ADDCOMMANDE, GETALLCOMMANDES, GETCOMMANDESWITHCHEFID, GETCOMMANDESWITHCLIENTID, GETONECOMMANDE } from "../ActionTypes/CommandeTypes"

const initialState = {
    commandesAsClient : [],
    commandesAsChef : [],
    newComm : {},
    allComm : [],
    wantedComm : {}

}

const CommandeReducer =(state= initialState, action)=>{
    switch (action.type) {
        case ADDCOMMANDE : 
            return {...state, newComm : action.payload.newComm}

        case GETCOMMANDESWITHCLIENTID : 
            return {...state, commandesAsClient : action.payload.commandes}

        case GETCOMMANDESWITHCHEFID : 
            return {...state, commandesAsChef : action.payload.commandes}

        case GETALLCOMMANDES : 
            return {...state, allComm : action.payload.commandes}

        case GETONECOMMANDE : 
            return {...state, wantedComm : action.payload.commande}
            
        default : return state
    }
}

export default CommandeReducer