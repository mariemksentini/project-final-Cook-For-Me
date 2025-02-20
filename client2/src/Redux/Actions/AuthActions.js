import axios from 'axios'
import { CHECKUSER, CURRENT, GETALLUSERS, GETONEUSER, LOGIN, LOGOUT, REGISTER } from "../ActionTypes/AuthActionTypes"
import { handleError } from './ErrorsActions'

export const Register =(newUser, navigate)=>async(dispatch)=>{
    try {
        
        const res = await axios.post('/api/auth/SignUp', newUser)
        dispatch({
            type : REGISTER,
            payload : res.data
        })
        navigate ('/Profil')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const LogIn =(authUser, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/auth/SignIn', authUser)
        dispatch({
            type : LOGIN,
            payload : res.data
        })
        navigate('/Profil')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const current=()=>async(dispatch)=>{
    try {
        const config = {
            headers : {
                autho : localStorage.getItem('token')
            }
        }

        const res = await axios.get('/api/auth/CurrentUser', config)

        dispatch({
            type : CURRENT,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}


export const logOut=()=>{
        return({
            type : LOGOUT
        })
}



export const modif =(id,updatedUser)=>async(dispatch)=>{
    try {
        await axios.put(`/api/auth/UpdateUser/${id}`, updatedUser)
        dispatch(current())
        
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const updateUserRate =(id, newRateNumber)=>async(dispatch)=>{
    try {
        await axios.put(`/api/auth/UpdateUserRate/${id}`, {newRateNumber : newRateNumber})
        dispatch(getOneUser(id))
        
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteUser =(id, navigate)=>async(dispatch)=>{
    try {
        dispatch({
            type : LOGOUT
        })
        
        await axios.put(`/api/auth/ArchiveUser/${id}`,{archived : true})
        // await axios.delete(`/api/panier/DeleteOnePanierByClientID/${{id}}`)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const changeCheck=()=>{
    return(
        ({
            type : CHECKUSER
        })
    )
}
export const checkUser =(userCrededentials)=>async(dispatch)=>{
    try {
        await axios.post('/api/auth/CheckUser', userCrededentials)

        dispatch(changeCheck())
       
        
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}


export const getAllUsers = ()=>async(dispatch)=>{
    try {
        const res = await axios.get('/api/auth/AllUsers')
        dispatch({
            type : GETALLUSERS,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const getOneUser =(id)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/auth/GetOneUser/${id}`)
        dispatch({
            type : GETONEUSER,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const deleteOneUser =(id, navigate)=>async(dispatch)=>{
    try {
        
        
        await axios.delete(`/api/auth/DeleteUser/${id}`)
        // await axios.delete(`/api/panier/DeleteOnePanierByClientID/${id}`)
        dispatch(getAllUsers())
        navigate('/GetAllUsers')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}


export const updateFromAdmin =(id,updatedUser)=>async(dispatch)=>{
    try {
        await axios.put(`/api/auth/UpdateUser/${id}`, updatedUser)
        dispatch(getOneUser(id))
        
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}