import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GetOnePanier } from "../../Redux/Actions/PanierActions"

const PanierDetails =()=>{
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log(id)
        dispatch(GetOnePanier(id))
    }, [dispatch, id])
    const onePanier = useSelector(state => state.PanierReducer.onePanier)
    return(
        <>
        <h1>{onePanier._id}</h1>
        <h2>{onePanier?.client?.name}</h2>
        </>
    )
}

export default PanierDetails