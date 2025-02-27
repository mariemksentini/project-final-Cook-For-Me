// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { deleteReqByID } from "../../Redux/Actions/AdminReqActions";
// import { Button } from "flowbite-react";

// const CardRequest = ({ request }) => {
//     const dispatch = useDispatch();

//     const handleDeleteRequest = (e) => {
//         e.preventDefault();
//         dispatch(deleteReqByID(request._id));
//     };

//     return (
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
//             {/* Card Image */}
//             <img
//                 className="w-full h-48 object-cover"
//                 src="https://source.unsplash.com/400x300/?person"
//                 alt="User"
//             />

//             {/* Card Body */}
//             <div className="p-5">
//                 {/* User Email */}
//                 <h5 className="text-xl font-semibold text-gray-900 mb-2">
//                     {request.email}
//                 </h5>

//                 {/* Details */}
//                 <p className="text-gray-600 mb-2">
//                     <span className="font-semibold">User ID:</span> {request.userID}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                     <span className="font-semibold">Type:</span> {request.type}
//                 </p>
//                 <p className="text-gray-700 italic">{request.message}</p>

//                 {/* Buttons */}
//                 <div className="mt-4 flex justify-between">
//                     {/* User Details Button */}
//                     <Link
//                         to={`/UserDetails/${request.userID}`}
//                         className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
//                     >
//                         View User
//                     </Link>

//                     {/* Mark as Done Button */}
//                     <Button
//                         onClick={handleDeleteRequest}
//                         className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
//                     >
//                         Mark as Done
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CardRequest;
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteReqByID } from "../../Redux/Actions/AdminReqActions";
import { Card, Dropdown } from "flowbite-react";
import { CheckCircle, EllipsisVertical } from "lucide-react";

const CardRequest = ({ request }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleDeleteRequest = () => {
        dispatch(deleteReqByID(request._id));
    };

    const bgColor = request?.userID?._id ? "bg-white" : "bg-gray-200"

    return (
        <Card className={`relative max-w-xs ${bgColor} rounded-lg shadow-lg p-4 text-center cursor-pointer`} style={{ margin: "10px" }}>
            {/* User Profile Picture */}
            <div className="flex justify-center mb-4">
                <img
                    src={request?.userID?.image || "/user.png"}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover"
                    onClick={()=> request?.userID?._id &&  navigate(`/UserDetails/${request.userID._id}`)}
                />
            </div>

            {/* Request Details */}
            <h3 className="text-lg font-bold text-gray-900">{request.email}</h3>
            <div className="mt-2 text-sm text-gray-600">
            <p>
                {request?.userID?._id 
                ? (<><strong>User ID:</strong> {request?.userID?._id}</>) 
                : ("Guest")}
            </p>

                <p><strong>Type:</strong> {request?.type}</p>
                <p className="italic">{request?.message}</p>
            </div>

            {/* Actions Dropdown */}
            {/* <div className="absolute top-4 right-4">
                <Dropdown arrowIcon={false} label={<EllipsisVertical className="w-5 h-5 text-gray-700" />} inline>
                    <Dropdown.Item as={Link} to={`/UserDetails/${request.userID._id}`}>View User</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteRequest} className="text-green-600">Mark as Done</Dropdown.Item>
                </Dropdown>
            </div> */}
            <div className="absolute top-4 right-4 cursor-pointer" onClick={handleDeleteRequest}>
                <CheckCircle className="w-6 h-6 text-green-600 hover:text-green-700" />
            </div>
        </Card>
    );
};

export default CardRequest;
