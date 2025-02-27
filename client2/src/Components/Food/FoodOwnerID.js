import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { current, getOneUser } from "../../Redux/Actions/AuthActions";
import { fetchFoodsOwnerID } from "../../Redux/Actions/FoodActions";
import { FaUtensils } from "react-icons/fa";
import { Button, Pagination } from "flowbite-react";
import { Archive, CookingPot } from "lucide-react";
import CardFood from "./CardFood";

const FoodOwnerID =()=>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [showArchived, setShowArchived] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    
    const token = localStorage.getItem("token");


    useEffect(() => {
        dispatch(getOneUser(id))
        if (token) dispatch(current());
    }, []);

    const user = useSelector((state) => state.AuthReducer.user);
    const wantedUser = useSelector((state)=> state.AuthReducer.wantedUser)

    useEffect(() => {
        dispatch(fetchFoodsOwnerID(id, currentPage, showArchived));
    }, [currentPage, showArchived]);

    const foods = useSelector((state) => state.FoodReducer.foodet) || [];
    const filteredFoods = foods.filter((el)=> el.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const totalPages = useSelector((state) => state.FoodReducer.totalPages);
    const onPageChange = (page) => setCurrentPage(page);
    return(
        <>
        {/* search */}
        <div className=" flex justify-center">
            <div className="mb-4 p-4  flex items-center gap-4 border rounded-lg shadow-md" style={{width : "98vw"}}>
                {/* Zone Input */}
                <div className="flex flex-col flex-grow text-center " style={{width : "98vw"}}>
                    <label className="block text-lg font-semibold mb-2 text-gray-800">
                    Food List of {wantedUser.name} {wantedUser.lastName}
                    </label>
                    <input
                        type="text"
                        placeholder={`Search food name`}
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>

        <div className="p-6 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                    
                </h2>
                <Button
                    color="light"
                    onClick={() => setShowArchived(!showArchived)}
                    className="flex items-center gap-2 hover:bg-gray-200 transition"
                >
                    <Archive className={`text-xl ${showArchived ? "text-red-500" : "text-gray-700"}`} />
                    <span style={{ marginLeft: "5px", marginTop: "2px" }} className={`${showArchived ? "text-red-500" : "text-gray-700"}`}>
                        {showArchived ? "Active Food" : "Archived Food"}
                    </span>
                </Button>
            </div>

            {/* Food Grid */}
            {filteredFoods.length > 0 ? (
                <>
                    <div className="flex flex-wrap justify-center">
                        {filteredFoods.map((fooda, i) => (
                            <CardFood key={i} fooda={fooda} currentPage={currentPage} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
                    </div>
                </>
            ) : (
                <div className="text-center w-full">There is no food at the moment.</div>
            )}
        </div>

        {/* Button to add food */}
        {token && user?.role === "user" && user._id === id &&(
            <div className="flex justify-center items-center">
                <Button
                    className="sm:w-auto text-white py-3 shadow-lg transition-all duration-200 focus:ring-4 focus:ring-teal-500"
                    style={{ width: "600px" }}
                    as={Link}
                    to="/CreateFood"
                >
                    <CookingPot className="mx-4"/> 
                    <span style={{ marginTop: "4px" }}>Cook for us!</span>
                </Button>
            </div>
        )}


        </>
    )
}

export default FoodOwnerID