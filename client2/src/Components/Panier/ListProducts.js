import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOwnPanier } from "../../Redux/Actions/PanierActions";
import CardProducts from "./CardProduct";
import CardChef from "./ParChef/CardChef";

const ListProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOwnPanier());
    }, []);

    const ownPanier = useSelector(state => state.PanierReducer.ownPanier);
    const c = ownPanier?.products?.map((prod) => prod?.product?.owner?._id);
    const chefsID = [...new Set(c)]; // Remove duplicate chef IDs

    return (
        <>
            {ownPanier?.products ? (
                <>
                    {/* Render CardProducts for each product */}
                    {/* {ownPanier?.products?.map((el) => (
                        <CardProducts key={el._id} el={el} ownPanier={ownPanier} />
                    ))} */}

                    {/* Render CardChef for each unique chef */}
                    {chefsID.map((chef) => {
                        const chefProducts = ownPanier.products.filter(
                            (el) => el.product.owner._id === chef
                        );

                        // Get the first product to extract chef's name
                        const firstProduct = chefProducts[0];

                        return (
                            <CardChef
                                key={chef}
                                chef={chef}
                                products={chefProducts}
                                chefName={firstProduct?.product?.owner?.name} // Pass chef's name
                                ownPanier={ownPanier}
                            />
                        );
                    })}
                </>
            ) : (
                <h3>No products in panier</h3>
            )}
        </>
    );
};

export default ListProducts;