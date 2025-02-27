import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../Redux/Actions/FoodActions";
import CardFood from "./CardFood";
import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";
import { current } from "../../Redux/Actions/AuthActions";
import { Button, Pagination } from "flowbite-react";
import { FaArchive, FaUtensils } from "react-icons/fa";
import { Archive, ChefHat, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListFoods = ({ searchTerm, searchType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [showArchived, setShowArchived] = useState(false);

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) dispatch(current());
    }, []);

    useEffect(() => {
        dispatch(fetchFoods(currentPage, showArchived));
    }, [currentPage, showArchived]);

    const user = useSelector((state) => state.AuthReducer.user);
    const foods = useSelector((state) => state.FoodReducer.foodet) || [];

    // Filtrage dynamique selon `searchType`
    const filteredFoods = foods.filter((el) => 
        searchType === "SFood"
            ? el.name.toLowerCase().includes(searchTerm.toLowerCase())
            : el.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || el.owner.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = useSelector((state) => state.FoodReducer.totalPages);
    const onPageChange = (page) => setCurrentPage(page);

    const handleMyFood =()=>{
        token ? navigate(`/FoodOwnerID/${user._id}`) : navigate('/SignIn')
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-wrap justify-between items-center">
                {(!token || user?.role === "user") ?
                (
                    <Button
                    color="light"
                    onClick={() => handleMyFood()}
                    className="flex items-center gap-2 hover:bg-gray-200 transition"
                >
                    <ChefHat className={`text-xl text-gray-700`} />
                    <span style={{ marginLeft: "5px", marginTop: "2px" }} className={"text-gray-700"}>
                        My Food
                    </span>
                </Button>
                )
                : 
                (<div></div>)

                }
                
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
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                    <UtensilsCrossed size={50} className="mb-2" />
                    <p>There is no food at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default ListFoods;
