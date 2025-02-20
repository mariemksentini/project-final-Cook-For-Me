import { GETALLPANIERS, GETONEPANIER, GETOWNPANIER } from "../ActionTypes/PanierTypes"

const initialState = {
    ownPanier : {},
    allPaniers : [],
    onePanier : {}

}

const PanierReducer =(state = initialState, action)=>{
    switch (action.type) {
        case GETOWNPANIER : 
            return {...state, ownPanier : action.payload.panier}

        case GETALLPANIERS : 
            return {...state, allPaniers : action.payload.paniers}

        case GETONEPANIER : 
            return {...state, onePanier : action.payload.panier}
        default : return state
    }
}

export default PanierReducer