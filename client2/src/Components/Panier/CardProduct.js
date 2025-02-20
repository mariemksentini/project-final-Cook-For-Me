import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOwnPanier, updatePanier } from '../../Redux/Actions/PanierActions';
import { Button } from 'flowbite-react';
import { Card } from "flowbite-react";

const CardProducts = ({ el, ownPanier }) => {
    const dispatch = useDispatch();
    const products = ownPanier.products;

    const handleDeleteFromPanier = async (e) => {
        e.preventDefault();
        const updatedProducts = products.filter((item) => item.product._id !== el.product._id);
        await dispatch(updatePanier({ products: updatedProducts }));
        dispatch(getOwnPanier());
    };

    return (
        <Card className="w-72 shadow-lg rounded-lg">
            <img className="w-full h-48 object-cover rounded-t-lg" src="holder.js/100px180" alt="Product" />
            <Card.Body>
                <h3 className="text-xl font-semibold mb-2">{el?.product?.name}</h3>
                <p className="text-sm text-gray-600">
                    Product ID: {el?.product?._id}<br />
                    Product Owner: {el?.product?.owner?.name}<br />
                    Quantity: {el?.qte}<br />
                    Order Time: {el?.order_time}
                </p>
                <Button 
                    onClick={(e) => handleDeleteFromPanier(e)} 
                    color="failure" // Tailwind color for delete
                    className="mt-3 w-full"
                >
                    Delete from Panier
                </Button>
                <Link to="/productDetails" state={{ el }} className="block mt-3">
                    <Button variant="primary" className="w-full">
                        Product Details
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CardProducts;
