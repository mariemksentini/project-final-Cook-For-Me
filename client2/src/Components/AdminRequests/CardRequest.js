import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReqByID } from "../../Redux/Actions/AdminReqActions";
import { Button } from "flowbite-react";

const CardRequest = ({ request }) => {
    const dispatch = useDispatch();

    const handleDeleteRequest = (e) => {
        e.preventDefault();
        dispatch(deleteReqByID(request._id));
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Card Image */}
            <img
                className="w-full h-48 object-cover"
                src="https://source.unsplash.com/400x300/?person"
                alt="User"
            />

            {/* Card Body */}
            <div className="p-5">
                {/* User Email */}
                <h5 className="text-xl font-semibold text-gray-900 mb-2">
                    {request.email}
                </h5>

                {/* Details */}
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">User ID:</span> {request.userID}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Type:</span> {request.type}
                </p>
                <p className="text-gray-700 italic">{request.message}</p>

                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                    {/* User Details Button */}
                    <Link
                        to={`/UserDetails/${request.userID}`}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        View User
                    </Link>

                    {/* Mark as Done Button */}
                    <Button
                        onClick={handleDeleteRequest}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Mark as Done
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CardRequest;
