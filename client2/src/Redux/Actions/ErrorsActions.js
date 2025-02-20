import { CLEARERROR, HANDLEERROR } from "../ActionTypes/ErrorsActionTypes"

export const handleError =(msg)=>(dispatch)=>{
    try {
        const id = Math.random()

        dispatch({
            type : HANDLEERROR,
            payload : {msg, id}
        })

        setTimeout(() => {
            dispatch({
                type : CLEARERROR,
                payload : id
            })
        }, 3000);
    } catch (error) {
        console.log(error)
    }
}


export const clearErrors=()=>{
    return(
        {
            type : CLEARERROR
        }
    )
}