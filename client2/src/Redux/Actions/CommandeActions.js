import axios from "axios";
import { handleError } from "./ErrorsActions";
import { ADDCOMMANDE, GETALLCOMMANDES, GETCOMMANDESWITHCHEFID, GETCOMMANDESWITHCLIENTID } from "../ActionTypes/CommandeTypes";

export const addCommande =(commandeData)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/commande/AddCommande', commandeData)
        dispatch({
            type : ADDCOMMANDE,
            payload : res.data
        })

    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getCommandesWithChefID = ()=>async(dispatch)=>{
    try {
        const config = {
            headers : {
                autho : localStorage.getItem('token')
            }
        }
        const res = await axios.get('/api/commande/GetCommandesWithChefID', config)

        dispatch({
            type : GETCOMMANDESWITHCHEFID,
            payload : res.data
        })

    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getCommandesWithClientID = ()=>async(dispatch)=>{
    try {
        const config = {
            headers : {
                autho : localStorage.getItem('token')
            }
        }
        const res = await axios.get('/api/commande/GetCommandesWithClientID', config)

        dispatch({
            type : GETCOMMANDESWITHCLIENTID,
            payload : res.data
        })

    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const updateCommandeStatus =(id,status)=>async(dispatch)=>{
    try {
        const res = await axios.put(`/api/commande/UpdateCommandeStatus/${id}`, {status})
        await console.log(res.data.msg)
        dispatch(getCommandesWithChefID())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteCommande = (id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/commande/DeleteCommande/${id}`)
        dispatch(getCommandesWithClientID())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getAllCommandes =()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/commande/GetAllCommandes')
        dispatch({
            type : GETALLCOMMANDES,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getOneCommandeWithID =(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/commande/GetOneCommandsWithID/${id}`)
        dispatch({
            type : GETALLCOMMANDES,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const updateCommande = (id, updatedData )=>async(dispatch)=>{
    try {
        await axios.put(`/api/commande/UpdateCommande/${id}`, updatedData)
        dispatch(getAllCommandes())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}