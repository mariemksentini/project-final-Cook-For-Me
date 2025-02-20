import { useDispatch, useSelector } from "react-redux";
import { getOwnPanier, updatePanier } from "../../../Redux/Actions/PanierActions";
import { current } from "../../../Redux/Actions/AuthActions";
import { useEffect } from "react";
import { addCommande } from "../../../Redux/Actions/CommandeActions";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";

const CardChef = ({ chef, products, chefName, ownPanier }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(current());
    }, [dispatch]);

    const user = useSelector(state => state.AuthReducer.user);

    const handleCommander = async (e) => {
        e.preventDefault();
        const commandeData = {
            products: products.map((el) => ({
                product: el.product._id,
                qte: el.qte,
                priceTot: (+el.qte) * (+el.product.price),
            })),
            client: user._id,
            chef: chef,
        };

        if (!commandeData.client || !commandeData.chef || commandeData.products.length === 0) {
            console.error("Missing data in commandeData");
            return;
        }

        await dispatch(addCommande(commandeData));

        const updatedProducts = ownPanier.products.filter(
            (item) => !products.some((el) => el.product._id === item.product._id)
        );
        await dispatch(updatePanier({ products: updatedProducts }));
        await dispatch(getOwnPanier());
        navigate('/CommandesAsClient');
    };

    const handleDeleteFromPanier = async (productId) => {
        const updatedProducts = ownPanier.products.filter(
            (item) => item.product._id !== productId
        );
        await dispatch(updatePanier({ products: updatedProducts }));
        dispatch(getOwnPanier());
    };

    const totalPrice = products.reduce((sum, el) => sum + el.qte * el.product.price, 0);


    return (
        <div className="flex justify-center py-10">
            <Card className="max-w-3xl w-full p-6 shadow-lg bg-white rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Chef: <span className="text-blue-600">{chefName}</span>
                </h2>

                <div className="space-y-5">
                    {products.map((el) => (
                        <div key={el._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{el.product.name}</h3>
                                <p className="text-gray-700">Quantity: <span className="font-semibold">{el.qte}</span></p>
                                <p className="text-gray-700">Total price: <span className="font-semibold">{el.prixTot} DT</span></p>
                            </div>
                            <Button 
                                onClick={() => handleDeleteFromPanier(el.product._id)} 
                                color="failure"
                                size="sm"
                                className="px-3 py-1 text-sm"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
                
                {/* Total Price Section */}
                <div className="mt-4 text-center text-lg font-semibold text-gray-800">
                    Total Price: <span className="text-green-600">{totalPrice.toFixed(2)} DT</span>
                </div>

                <div className="mt-6 flex justify-center">
                    <Button 
                        onClick={handleCommander} 
                        color="success"
                        size="lg"
                        className="w-full"
                    >
                        Confirm Order
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default CardChef;
