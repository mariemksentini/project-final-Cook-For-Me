import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { current } from "../Redux/Actions/AuthActions";

const PrivateRoute = ({ roles, children }) => {
    const token = localStorage.getItem('token');
    
    const dispatch = useDispatch();
   


    useEffect(() => {
   
            dispatch(current());
        
    }, []);

    const user = useSelector((state) => state.AuthReducer.user);

    var x =roles?.includes(user?.role)


    return (
        <div>
            {
           x  &&  ( token &&  x? children : <Navigate to="/" />)
            }
        </div>
    );
};


export default PrivateRoute