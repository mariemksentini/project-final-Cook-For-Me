import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../Redux/Actions/FoodActions";
import CardFood from "./CardFood";
import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";
import { current } from "../../Redux/Actions/AuthActions";
import { Button, Pagination } from "flowbite-react";
import { FaArchive, FaUtensils } from "react-icons/fa";  {/* Use FaArchive instead of FaBoxArchive */}

const ListFoods = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) dispatch(current());
    }, []);

    useEffect(() => {
        dispatch(fetchFoods(currentPage, showArchived));
    }, [currentPage, showArchived]);

    const foods = useSelector((state) => state.FoodReducer.foodet);
    const totalPages = useSelector((state) => state.FoodReducer.totalPages);

    const onPageChange = (page) => setCurrentPage(page);

    return (
        <div className="p-6 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                    <FaUtensils className="text-blue-600" size={24} />
                    Food List
                </h2>
                <Button
                    color="light"
                    onClick={() => setShowArchived(!showArchived)}
                    className="flex items-center gap-2 hover:bg-gray-200 transition"
                >
                    <FaArchive
                        className={`text-xl ${showArchived ? "text-red-500" : "text-gray-700"}`}
                    />
                    <span style={{marginLeft : "5px"}}>
                        {showArchived ? "Show Active Foods" : "Show Archived Foods"}
                    </span>
                    
                </Button>
            </div>

            {/* Food Grid */}
            {foods ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {foods.map((fooda, i) => (
                            <CardFood key={i} fooda={fooda} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <AnimeSnakeLoading />
                </div>
            )}
        </div>
    );
};

export default ListFoods;
