import { useNavigate } from 'react-router-dom'; // Use named import instead of require

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check for token
    const navigate = useNavigate()
    // If token exists, render children; otherwise, redirect to home
    return (
        <div>
            {
                token ? children : navigate('/')
            }
        </div>
    )
};

export default PrivateRoute;