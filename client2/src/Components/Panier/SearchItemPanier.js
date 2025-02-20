import { FloatingLabel } from "flowbite-react";


const SearchItemPanier = () => {
    return (
        <form className="space-y-3">
            <div className="flex flex-col">
                <label htmlFor="search" className="text-sm font-medium text-gray-700">Search item in panier</label>
                <FloatingLabel
                    id="search"
                    variant="outlined"
                    placeholder="Search item in panier"
                    className="border-2 border-gray-300 rounded-md p-2 mt-1"
                />
            </div>
        </form>
    );
};

export default SearchItemPanier;
