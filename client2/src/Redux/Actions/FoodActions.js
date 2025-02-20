import axios from 'axios'
import { DELETEONEFOOD, FETCHFOODS, GETALLFOOD, GETONEFOOD } from '../ActionTypes/FoodTypes'
import { handleError } from './ErrorsActions'

export const getAllFood = ()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/food/GetAllFood')
        dispatch({
            type : GETALLFOOD,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const fetchFoods =(page, archieved)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/food/FetchFoods?page=${page}&pageSize=4&archieved=${archieved}`);

        dispatch({
            type : FETCHFOODS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const addFood =(foodToAdd, navigate)=>async(dispatch)=>{
    try {
     
        await axios.post('/api/food/AddFood', foodToAdd,{
            headers : {
                autho : localStorage.getItem('token')
            }
        })

        dispatch(getAllFood())
        navigate('/IndexFoods')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getOneFood =(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/food/GetOneFood/${id}`)
        dispatch({
            type : GETONEFOOD,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteOneFood =(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/food/DeleteOneFood/${id}`)
        await dispatch({
            type : DELETEONEFOOD
        })
        dispatch(getAllFood())
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const editOneFood =(id, foodDetails)=>async(dispatch)=>{
    try {
        await axios.put(`/api/food/UpdateOneFood/${id}`,foodDetails )
        dispatch(getAllFood())
        
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}