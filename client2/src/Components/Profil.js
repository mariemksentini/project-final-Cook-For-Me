import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { current } from '../Redux/Actions/AuthActions';
import AnimeSnakeLoading from './Loading/AnimeSnakeLoading';
import { Button } from 'flowbite-react'; // Flowbite Button component

const Profil = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(current());
    }, [dispatch]);

    const user = useSelector(state => state.AuthReducer.user);

    return (
        <>
            {user ? (
                <>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <h3 className="text-xl">{user.age}</h3>
                    <h3 className="text-xl">{user.email}</h3>
                    <h4 className="text-lg">{user?.address?.country}</h4>

                    <div className="flex space-x-4 mt-4">
                        <Button as={Link} to='/EditProfil' color="success">
                            Modify
                        </Button>
                        <Button as={Link} to='/DeleteUser' color="failure">
                            Delete Profile
                        </Button>
                    </div>
                    {
                        user.role === "user" &&
                        <div className="mt-4">
                        <Button as={Link} to='/IndexPanier' >
                            Own Panier
                        </Button>
                    </div>
                    }
                    
                </>
            ) : (
                <AnimeSnakeLoading />
            )}
        </>
    );
};

export default Profil;
