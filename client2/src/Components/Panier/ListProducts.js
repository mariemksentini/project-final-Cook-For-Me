import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnPanier } from "../../Redux/Actions/PanierActions";
import CardChef from "./ParChef/CardChef";
import { Spinner } from "flowbite-react";
import { PackageSearch } from "lucide-react"; // Lucide icon
import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";

const ListProducts = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        dispatch(getOwnPanier()).then(() => setLoading(false)); // Stop loading after fetching
    }, []);

    const ownPanier = useSelector(state => state.PanierReducer.ownPanier);
    const chefsID = [...new Set(ownPanier?.products?.map(prod => prod?.product?.owner?._id))]; // Unique chef IDs

    return (
        <>
            {loading ? (
                // 🔄 Spinner when loading
                <div className="flex justify-center items-center h-40">
                    <SpinnerDeepSeek/>
                </div>
            ) : ownPanier?.products?.length ? (
                <>
                    {chefsID.map((chef) => {
                        const chefProducts = ownPanier.products.filter(
                            (el) => el?.product?.owner?._id === chef
                        );

                        return (
                            <CardChef
                                key={chef}
                                chef={chef}
                                products={chefProducts}
                                chefEmail={chefProducts[0]?.product?.owner?.email}
                                ownPanier={ownPanier}
                            />
                        );
                    })}
                </>
            ) : (
                // 📦 No products UI
                <div className="flex flex-col items-center justify-center h-screen text-gray-600">
                    <PackageSearch size={50} className="mb-2" />
                    <p>Votre panier est vide.</p>
                </div>
            )}
        </>
    );
};

export default ListProducts;
