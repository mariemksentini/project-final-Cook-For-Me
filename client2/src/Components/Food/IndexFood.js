import { Link } from "react-router-dom";
import ListFoods from "./ListFood";
import { Button } from "flowbite-react";
import { CookingPot } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../Redux/Actions/AuthActions";
import SearchFood from "./SearchFood";

const IndexFoods = () => {
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if (token) dispatch(current());
    }, []);

    const user = useSelector((state) => state.AuthReducer.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("SFood"); // "SFood" ou "SChef"

    return (
        <div className="space-y-8 px-4 py-6">
            {/* SearchBar */}
            <SearchFood searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} />
            
            {/* List of Foods */}
            <ListFoods searchTerm={searchTerm} searchType={searchType} />

            {/* Button to add food */}
            {token && user?.role === "user" && (
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
            {!token && (
                <div className="flex justify-center items-center">
                    <Button
                        className="sm:w-auto text-white py-3 shadow-lg transition-all duration-200 focus:ring-4 focus:ring-teal-500"
                        style={{ width: "600px" }}
                        as={Link}
                        to="/SignIn"
                    >
                        <CookingPot className="mx-4"/> 
                        <span style={{ marginTop: "4px" }}>Cook for us!</span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default IndexFoods;
