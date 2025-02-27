import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { current, deleteOneUser, getOneUser, updateFromAdmin } from '../../Redux/Actions/AuthActions';
import { MoreVertical, Star, Undo2 } from 'lucide-react';
import AnimeSnakeLoading from '../Loading/AnimeSnakeLoading';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wantedUser = useSelector((state) => state.AuthReducer.wantedUser);
  const user = useSelector((state) => state.AuthReducer.user);
  const [role, setRole] = useState(wantedUser.role);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
        dispatch(current());
    }
    dispatch(getOneUser(id)).then(() => setLoading(false));
}, [token, id, dispatch]);


  const handleDeleteUser = () => dispatch(deleteOneUser(id, navigate));

  const handleArchUnarchive = () => {
    const updatedUser = { ...wantedUser, archived: !wantedUser.archived };
    dispatch(updateFromAdmin(id, updatedUser));
  };

  const handleChangeRole = (newRole) => {
    setRole(newRole);
    const updatedUser = { ...wantedUser, role: newRole };
    dispatch(updateFromAdmin(id, updatedUser));
  };

  const validRatings = wantedUser?.rate?.filter((r) => r !== null);
  const averageRating = validRatings?.length
    ? (validRatings.reduce((acc, val) => acc + val, 0) / validRatings.length).toFixed(1)
    : "No Ratings";

  if (loading) return <AnimeSnakeLoading />;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg relative">
      <div className="flex justify-between items-center mb-4">
        
        <Dropdown
          label={<MoreVertical className="w-6 h-6 cursor-pointer text-gray-600" />}
          placement="bottom-start"
          arrowIcon={false}
          inline
        >
          {user.role === "admin" &&
            (<>
            <Dropdown.Item className="hover:bg-red-400 text-red-700" onClick={handleDeleteUser}>
              Delete user
            </Dropdown.Item>
            <Dropdown.Item onClick={handleArchUnarchive}>
              {wantedUser.archived ? 'Unarchive' : 'Archive'}
            </Dropdown.Item>
            </>)
          }
          <Dropdown.Item >
            Contact user
          </Dropdown.Item>
          
        </Dropdown>
        <button onClick={() => navigate("/GetAllUsers")} className="w-6 h-6 text-gray-700 hover:text-gray-900 transition">
          <Undo2 className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center space-x-6 p-4 border-b border-gray-300">
        <img src={wantedUser.image} alt="Profile" className="w-32 h-32 rounded-lg border-4 border-teal-500 object-cover" />
      </div>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 text-center">{wantedUser?.name} {wantedUser?.lastName}</h1>
        <p className="text-lg text-gray-600 text-center">{wantedUser?.email}</p>
        <p className="text-lg text-gray-600">Birthday: {wantedUser?.birthdate}</p>
        <p className="text-lg text-gray-600">Role: {wantedUser?.role}</p>
      </div>

      {user.role === "admin" &&
        <div className="mt-4">
        <Dropdown label="Change Role" arrowIcon={false} inline>
          {["admin", "user", "livreur"].map((r) => (
            <Dropdown.Item key={r} onClick={() => handleChangeRole(r)}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      }

      {wantedUser?.address?.country && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-teal-700">Address:</h3>
          <p>{wantedUser?.address?.houseNum} {wantedUser?.address?.street}</p>
          <p>{wantedUser?.address?.city}, {wantedUser?.address?.zipCode}</p>
          <p>{wantedUser?.address?.state}, {wantedUser?.address?.country}</p>
        </div>
      )}

      <div className="mt-4 flex items-center space-x-2 text-gray-800">
        <h3 className="font-semibold text-lg">Rating:</h3>
        {averageRating !== "No Ratings" ? (
          <>
            <span className="text-lg font-semibold">{averageRating}</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </>
        ) : (
          <span className="text-gray-400">No Ratings</span>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
