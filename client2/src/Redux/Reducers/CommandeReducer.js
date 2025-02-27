import { ADDCOMMANDE, GETALLCOMMANDES, GETCOMMANDESWITHCHEFID, GETCOMMANDESWITHCLIENTID, GETCOMMANDESWITHLIVREURID, GETONECOMMANDE } from "../ActionTypes/CommandeTypes"

const initialState = {
    commandesAsClient : [],
    commandesAsChef : [],
    commandesAsLivreur : [],
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

        case GETCOMMANDESWITHLIVREURID : 
            return {...state, commandesAsLivreur : action.payload.commandes}

        case GETALLCOMMANDES : 
            return {...state, allComm : action.payload.commandes}

        case GETONECOMMANDE : 
            return {...state, wantedComm : action.payload.commande.commande}
            
        default : return state
    }
}

export default CommandeReducer