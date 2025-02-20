import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRequests } from "../../Redux/Actions/AdminReqActions";
import CardRequest from "./CardRequest";
import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";

const ListRequests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllRequests());
    }, [dispatch]);

    const allReqs = useSelector((state) => state.AdminReqReducer.allReqs);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Admin Requests
            </h1>

            {allReqs ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                    {allReqs.map((request) => (
                        <CardRequest key={request._id} request={request} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center mt-10">
                    <AnimeSnakeLoading />
                </div>
            )}
        </div>
    );
};

export default ListRequests;
