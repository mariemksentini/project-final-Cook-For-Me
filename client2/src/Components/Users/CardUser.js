import { Button, Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOneUser, fetchUsers } from "../../Redux/Actions/AuthActions";
import { MoreVertical } from "lucide-react";

const CardUser = ({ user, currUser, currentPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const archived = user.archived;

  const handleDeleteUser = async () => {
    await dispatch(deleteOneUser(user._id, navigate));
    dispatch(fetchUsers(currentPage, archived));
  };

  const handleNavDetails =()=>{
    user._id === currUser._id ?
    navigate('/Profil')
    : navigate(`/UserDetails/${user._id}`)
  }

  const bgColor = user._id === currUser._id 
  ? "bg-purple-100" 
  : archived 
    ? "bg-gray-200" 
    : "bg-white"; 


  return (
    <div
      className={`relative max-w-xs rounded overflow-hidden shadow-lg cursor-pointer ${bgColor} `}
      style={{ width: "310px", margin: "10px" }}
    >
      <div className="p-4">
        {/* Profile Image */}
        <div onClick={()=>handleNavDetails()} className="w-full flex justify-center">
          <img
            src={user.image || "/user.png"}
            alt="User Profile"
            className=" object-cover "
            style={{width : "160px", height : "160px", borderRadius : "9999px"}}
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h3 className="text-lg font-bold text-gray-900">{user.name} {user.lastName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user?.address?.country}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/* Action Icons */}
        <div className="absolute top-4 right-2">
          <Dropdown label={<MoreVertical className="w-5 h-5 text-gray-700" />} 
          arrowIcon={false}
          inline
          >
            {currUser._id === user._id 
            ? <Dropdown.Item as={Link} to={`/Profil`}>Profil</Dropdown.Item>
            : 
            <Dropdown.Item as={Link} to={user._id === currUser._id ? '/Profil' : `/UserDetails/${user._id}`}>Details</Dropdown.Item>

            }
            <Dropdown.Item as={Link} to={`/FoodOwnerID/${user._id}`}>Foods</Dropdown.Item>

            {currUser.role === "admin" &&
              (<Dropdown.Item onClick={() => handleDeleteUser()} className="text-red-600">Delete User</Dropdown.Item>)
            }
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
