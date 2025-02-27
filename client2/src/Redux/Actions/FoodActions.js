import axios from 'axios'
import { DELETEONEFOOD, FETCHFOODS, FETCHFOODSOWNERID, GETALLFOOD, GETONEFOOD } from '../ActionTypes/FoodTypes'
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

export const fetchFoods =(page, archived)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/food/FetchFoods?page=${page}&pageSize=8&archived=${archived}`);

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

export const fetchFoodsOwnerID =(id, page, archived)=>async(dispatch)=>{
    try {
        const res = await axios.get(`/api/food/FetchFoodsOwnerID/${id}?page=${page}&pageSize=8&archived=${archived}`);

        dispatch({
            type : FETCHFOODSOWNERID,
            payload : res.data
        })
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}



export const addFood = (foodToAdd, navigate, id) => async (dispatch) => {
    try {
        if (foodToAdd.image && foodToAdd.image !== "/food.jpg") { 
            const formData = new FormData();
            formData.append("image", foodToAdd.image);

            const res = await axios.post(
                "https://api.imgbb.com/1/upload?key=5e24b767fba1295361aeff54487db37c",
                formData
            );

            foodToAdd.image = res.data.data.url; // Use uploaded image URL
        } else {
            delete foodToAdd.image; // Remove image field, backend will handle default
        }

        await axios.post(
            "/api/food/AddFood",
            foodToAdd,
            {
                headers: {
                    autho: localStorage.getItem("token"),
                },
            }
        );

        dispatch(getAllFood());
        navigate(`/FoodOwnerID/${id}`);
    } catch (error) {
        error.response?.data?.errors?.forEach((element) => {
            dispatch(handleError(element.msg));
        });
    }
};



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

export const editOneFood = (id, foodDetails) => async (dispatch) => {
    try {
        let updatedDetails = { ...foodDetails };

        if (foodDetails.image && foodDetails.image instanceof File) {
            const formData = new FormData();
            formData.append("image", foodDetails.image);

            const res = await axios.post(
                "https://api.imgbb.com/1/upload?key=5e24b767fba1295361aeff54487db37c",
                formData
            );

            updatedDetails.image = res.data.data.url;
        }

        await axios.put(`/api/food/UpdateOneFood/${id}`, updatedDetails);
        dispatch(getAllFood());
    } catch (error) {
        if (error.response?.data?.errors) {
            error.response.data.errors.forEach((element) => {
                dispatch(handleError(element.msg));
            });
        } else {
            console.error("Error updating food:", error);
        }
    }
};


