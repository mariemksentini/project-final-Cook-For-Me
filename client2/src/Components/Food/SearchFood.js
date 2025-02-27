import { FaExchangeAlt, FaUtensils } from "react-icons/fa";

const SearchFood = ({ searchTerm, setSearchTerm, searchType, setSearchType }) => {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSearchType = () => {
        setSearchType(prev => (prev === "SFood" ? "SChef" : "SFood"));
    };

    return (
        <div className=" flex justify-center">
        <div className="mb-4 p-4  flex items-center gap-4 border rounded-lg shadow-md" style={{width : "98vw"}}>
            {/* Zone Input */}
            <div className="flex flex-col flex-grow text-center " style={{width : "98vw"}}>
                <label className="block text-lg font-semibold mb-2 text-gray-800">
                    <strong className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                        <FaUtensils className="text-blue-600" size={24} />
                        Food List
                    </strong>
                </label>
                <input
                    type="text"
                    placeholder={`Search ${searchType === "SFood" ? "food" : "chef"} name`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Bouton Switch (Aligné au centre verticalement) */}
            <button 
                onClick={toggleSearchType} 
                className="p-2  rounded-full bg-gray-200 hover:bg-gray-300 transition flex  items-center justify-center"
                title="Switch Search Type"
                style={{marginTop : "39px"}}
            >
                <FaExchangeAlt className="text-gray-700 text-xl" />
            </button>
        </div>
        </div>
    );
};

export default SearchFood;
