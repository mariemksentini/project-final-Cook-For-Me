import axios from "axios";
import { GETALLREQUESTS, SENDREQUESTTOADMIN } from "../ActionTypes/AdminReqTypes";
import { handleError } from "./ErrorsActions";

export const GetAllRequests = ()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/adminReq/GetAllRequests')
        dispatch({
            type : GETALLREQUESTS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const SendRequestToAdmin=(requestToSend, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/adminReq/SendRequestToAdmin', requestToSend)
        dispatch({
            type : SENDREQUESTTOADMIN,
            payload : res.data
        })
        navigate('/')
        console.log(res.data)
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteReqByID =(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/adminReq/DeleteReqByID/${id}`)
        dispatch(GetAllRequests())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}