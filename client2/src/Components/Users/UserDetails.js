import { useEffect } from 'react';
import { Button } from 'flowbite-react'; // Flowbite Button
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOneUser, getOneUser, updateFromAdmin } from '../../Redux/Actions/AuthActions';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneUser(id));
  }, []);

  const user = useSelector((state) => state.AuthReducer.wantedUser);
  console.log(user);

  const handleDeleteUser = (e) => {
    e.preventDefault();
    dispatch(deleteOneUser(id, navigate));
  };

  const handleArchUnarchieve = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, archived: !user.archived };
    dispatch(updateFromAdmin(id, updatedUser));
  };

  return (
    <>
      {user ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
          <h3 className="text-xl text-gray-600">{user.age} years old</h3>
          <h3 className="text-lg text-gray-500">{user.email}</h3>
          <h4 className="text-md text-gray-400">{user?.address?.country}</h4>
          
          <div className="mt-4 flex gap-2">
            <Button
              onClick={(e) => handleArchUnarchieve(e)}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {user.archived ? 'Unarchive' : 'Archive'}
            </Button>
            <Button
              onClick={(e) => handleDeleteUser(e)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </Button>
            <Link to="/GetAllUsers">
              <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">
                Go Back
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-xl text-gray-600">Loading...</h1>
      )}
    </>
  );
};

export default UserDetails;
