import axios from "axios";
import { handleError } from "./ErrorsActions";
import { ADDRENDEZVOUS, GETALLRENDEZVOUSS, GETONECHEFRENDEZVOUS, GETONERENDEZVOUS } from "../ActionTypes/RendezVousTypes";

export const getAllRendezVous = ()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/rendezVous/getAllRendezVous')
        dispatch({
            type : GETALLRENDEZVOUSS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getOneChefRendezVous =(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/rendezVous/getOneChefRendezVous/${id}`)
        dispatch({
            type : GETONECHEFRENDEZVOUS,
            payload : res.data.rendezvouss
        })

    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getOneRendezVous =(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/rendezVous/getOneRendezVous/${id}`)

        dispatch({
            type : GETONERENDEZVOUS,
            payload : res.data.found
        })

    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const addRendezVous = (rdvData)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/rendezVous/addRendezVous', rdvData, {
            headers : {
                autho : localStorage.getItem('token')
            }
        })
        dispatch({
            type : ADDRENDEZVOUS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const updateRendezVous = (id, rdvData)=>async(dispatch)=>{
    try {
        await axios.put(`/api/rendezVous/updateRendezVous/${id}`, rdvData)
        // dispatch(getAllRendezVous())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteRendezVous = (id) =>async(dispatch)=>{
    try {
        await axios.delete(`/api/rendezVous/deleteRendezVous/${id}`)
        // dispatch(getAllRendezVous())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}