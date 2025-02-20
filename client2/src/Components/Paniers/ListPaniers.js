import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetAllPaniers } from "../../Redux/Actions/PanierActions"
import CardPanier from "./CardPanier"

const ListPaniers =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(GetAllPaniers())
    }, [])
    const paniers = useSelector(state => state.PanierReducer.allPaniers)
    return(
        <div>
            {
                paniers && paniers.map((panier, i, t)=> <CardPanier key={panier._id} panier = {panier}/>)
            }
        </div>
    )
}

export default ListPaniers