// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAllRequests } from "../../Redux/Actions/AdminReqActions";
// import CardRequest from "./CardRequest";
// import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";

// const ListRequests = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(GetAllRequests());
//     }, [dispatch]);

//     const allReqs = useSelector((state) => state.AdminReqReducer.allReqs);

//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Admin Requests
//             </h1>

//             {allReqs ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//                     {allReqs.map((request) => (
//                         <CardRequest key={request._id} request={request} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex justify-center mt-10">
//                     <AnimeSnakeLoading />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ListRequests;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAllRequests } from "../../Redux/Actions/AdminReqActions";
// import CardRequest from "./CardRequest";
// import { FaClipboardList } from "react-icons/fa";
// import { current } from "../../Redux/Actions/AuthActions";
// import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";
// const ListRequests = () => {
//     const dispatch = useDispatch();
//     const token = localStorage.getItem("token");
//     const [loading, setLoading] = useState(true); // Loading state
        
//     useEffect(() => {
//         dispatch(GetAllRequests()).then(() => setLoading(false));
//         if (token) dispatch(current());
//     }, []);


//     const allReqs = useSelector((state) => state.AdminReqReducer.allReqs);

//     return (
//         <>
//         {loading ?
//         (<div className="flex justify-center items-center h-40">
//             <SpinnerDeepSeek/>
//         </div>)
//         :
//         (<div className="min-h-screen bg-gray-100 py-10">
//             {/* Header & Controls */}
//             <div className="p-6 space-y-6">
//                 <div className="flex flex-wrap justify-between items-center">
//                     <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
//                         <FaClipboardList className="text-blue-600" size={24} />
//                         Admin Requests
//                     </h2>
//                 </div>
//             </div>
        
//             {allReqs ? (
//                 <div className="flex flex-wrap justify-center gap-6 px-6">
//                     {allReqs.map((request) => (
//                         <CardRequest key={request._id} request={request} />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex justify-center mt-10">
//                     <SpinnerDeepSeek />
//                 </div>
//             )}
//         </div>)
//     }
//         </>
       



//     );
// };

// export default ListRequests;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRequests } from "../../Redux/Actions/AdminReqActions";
import { current } from "../../Redux/Actions/AuthActions";
import CardRequest from "./CardRequest";
import { FaClipboardList } from "react-icons/fa";
import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";
import { MessageCircleOff, PackageSearch } from "lucide-react"; 

const ListRequests = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        dispatch(GetAllRequests()).then(() => setLoading(false));
        if (token) dispatch(current());
    }, [dispatch, token]);

    const allReqs = useSelector((state) => state.AdminReqReducer.allReqs);

    return (
        <div className="h-screen bg-gray-100 py-10">
            {/* ✅ Show header only when there are requests */}
            {allReqs?.length > 0 && (
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                        <FaClipboardList className="text-blue-600" size={24} />
                        Admin Requests
                    </h2>
                </div>
            )}

            {/* ✅ Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <SpinnerDeepSeek />
                </div>
            ) : allReqs?.length > 0 ? (
                // ✅ Requests List
                <div className="flex flex-wrap justify-center gap-6 px-6">
                    {allReqs.map((request) => (
                        <CardRequest key={request._id} request={request} />
                    ))}
                </div>
            ) : (
                // ✅ Empty State (No Requests)
                <div className="flex flex-col items-center justify-center h-sreen text-gray-600">
                    <MessageCircleOff size={50} className="mb-2" />
                    <p>Aucune demande trouvée.</p>
                </div>
            )}
        </div>
    );
};

export default ListRequests;
