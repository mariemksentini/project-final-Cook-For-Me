import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllUsers } from "../../Redux/Actions/AuthActions"
import CardUser from "./CardUser"

const ListUsers = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
    const users = useSelector(state => state.AuthReducer.users)
    return(
        <div>
            { users ? 
                users.map((user,i,t)=> <CardUser user={user} key={i}/>) : <h1>famech wala mazel osber</h1>
            }
        </div>
    )
}

export default ListUsers