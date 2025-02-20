import axios from "axios"
import { GETALLPANIERS, GETONEPANIER, GETOWNPANIER } from "../ActionTypes/PanierTypes"
import { handleError } from "./ErrorsActions"

export const getOwnPanier =()=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/panier/GetOwnPanier`, {
            headers : {
                autho : localStorage.getItem('token')
            }
        })
        dispatch({
            type : GETOWNPANIER,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const updatePanier = (newTabProducts)=>async(dispatch)=>{
    try {
        await axios.put('/api/panier/UpdateOnePanier', newTabProducts, {
            headers : {
                autho : localStorage.getItem('token')
            }
        })
        dispatch(getOwnPanier())
        
    } catch (error) {
        console.log(error)
    }
}

export const GetAllPaniers =()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/panier/GetAllPaniers')
        dispatch({
            type : GETALLPANIERS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const GetOnePanier = (id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/panier/GetOnePanierByClientID/${id}`)
        dispatch({
            type : GETONEPANIER,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const DeleteOnePanierByID =(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/panier/DeleteOnePanierByID/${id}`)
        dispatch(GetAllPaniers())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}
