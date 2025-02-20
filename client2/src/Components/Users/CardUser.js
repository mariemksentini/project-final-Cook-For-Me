import { Button } from 'flowbite-react'; // Import Flowbite Button
import { Card } from 'flowbite-react'; // Import Flowbite Card
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteOneUser } from '../../Redux/Actions/AuthActions';

const CardUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUser = (e, id) => {
    e.preventDefault();
    dispatch(deleteOneUser(id, navigate));
  };

  return (
    
    <Card className="w-72 bg-white shadow-md rounded-lg">
      <image
        src="holder.js/100px180"
        alt="User Image"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {user.name}
        </h3>
        <h3 className="text-sm text-gray-500">
          {user.email}
          <br />
          {user?.address?.country}
        </h3>
        <div className="flex gap-2">
          <Link to={`/UserDetails/${user._id}`}>
            <Button  color="failure">
              View Details
            </Button>
          </Link>
          <Button
            onClick={(e) => handleDeleteUser(e, user._id)}
            color="failure"
          >
            Delete User
          </Button>
        </div>
      </div>
    </Card>

//   <Card href="#" className="max-w-sm">
//   <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//     Noteworthy technology acquisitions 2021
//   </h5>
  
//   <p className="font-normal text-gray-700 dark:text-gray-400">
//     Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
//   </p>
//       <Link to={`/UserDetails/${user._id}`}>
//         <Button color="blue">
//           View Details
//         </Button>
//       </Link>
//       <Button
//         onClick={(e) => handleDeleteUser(e, user._id)}
//         color="blue"
//       >
//         Delete User
//       </Button>
// </Card>
    // <div>
    //    {user.name}
    //    <Link to={`/UserDetails/${user._id}`}>
    //        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
    //          View Details
    //        </Button>
    //      </Link>
    // </div>
  );
};

export default CardUser;
