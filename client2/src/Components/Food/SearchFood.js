import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        // Dispatch action to filter or search foods here
    };

    return (
        <div className="mb-4 p-4">
            <label className="block text-lg font-semibold mb-2">Food name</label>
            <input
                type="text"
                placeholder="Search food name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchFoods;
