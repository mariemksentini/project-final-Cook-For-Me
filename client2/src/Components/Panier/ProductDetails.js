import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneFood } from "../../Redux/Actions/FoodActions"
import { useLocation } from "react-router-dom";

const ProductDetails =()=>{
    const location = useLocation();
    const { el } = location.state || {}
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getOneFood(el.product._id))
        console.log(el)
    },[])
    const food = useSelector(state => state.FoodReducer.wantedFood)
    return (
        <>
            <h1>food nme : {food.name}</h1>
            <h2>type : {food.type}</h2>
            <h2>bio : {food.biography}</h2>
            <h3>owner name :{food?.owner?.name}</h3>
            <h3>son email : {food?.owner?.email}</h3>
        </>
    )
}

export default ProductDetails