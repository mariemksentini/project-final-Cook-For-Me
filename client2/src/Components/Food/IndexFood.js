import { Link } from "react-router-dom";
import ListFoods from "./ListFood";
import SearchFoods from "./SearchFood";
import { Button } from "flowbite-react";

const IndexFoods = () => {
    return (
        <div className="space-y-8 px-4 py-6">
            <SearchFoods />
            <ListFoods />
            {/* Floating Button */}
            <div className="flex justify-center items-center">
                <Button
                    className=" sm:w-auto text-white  py-3 shadow-lg transition-all duration-200 focus:ring-4 focus:ring-teal-500"
                    style={{width : "600px"}}
                    as={Link}
                    to="/CreateFood"
                >
                    + Create Food
                </Button>
            </div>
        </div>
    );
};

export default IndexFoods;
