import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteOneFood, getOneFood } from "../../Redux/Actions/FoodActions";
import { getOwnPanier, updatePanier } from "../../Redux/Actions/PanierActions";
import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";
import { Button, Card } from "flowbite-react";
import { FaPlus, FaMinus, FaTrash, FaEdit, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const FoodDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOneFood(id));
        dispatch(getOwnPanier());
    }, [id, dispatch]);

    const food = useSelector((state) => state.FoodReducer.wantedFood);
    const ownPanier = useSelector((state) => state.PanierReducer.ownPanier);
    const user = useSelector((state) => state.AuthReducer.user);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(ownPanier?.products || []);
    }, [ownPanier]);

    const existingProduct = products.find((el) => el.product._id === food?._id);
    const qteInitial = existingProduct ? existingProduct.qte : 0;
    const [qte, setQte] = useState(qteInitial);

    useEffect(() => {
        setQte(qteInitial);
    }, [qteInitial]);

    const handleDeleteFood = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneFood(id));
        navigate("/IndexFoods");
    };

    const handleAddToPanier = async (e) => {
        e.preventDefault();
        const updatedProducts = existingProduct
            ? products.map((el) =>
                  el.product._id === food._id ? { ...el, qte: qte } : el // Set qte directly
              )
            : [...products, { product: food._id, qte, prixTot : +(food.price * qte) , order_time: new Date().toISOString() }];
    
        await dispatch(updatePanier({ products: updatedProducts }));
        navigate("/IndexPanier");
    };
    

    const handleDeleteFromPanier = (e) => {
        e.preventDefault();
        const updatedProducts = products.filter((el) => el.product._id !== food._id);
        dispatch(updatePanier({ products: updatedProducts }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            {food ? (
                <Card className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <img
                                src={food.imageUrl}
                                alt={food.name}
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 space-y-4">
                            <h1 className="text-3xl font-bold text-gray-800">{food.name}</h1>
                            <h2 className="text-lg text-gray-600">{food.type}</h2>
                            <p className="text-gray-700">{food.biography}</p>
                            <p className="text-lg font-semibold text-gray-900">{food.price} DT</p>
                            <p className="text-gray-500">Stock: {food.quantity}</p>
                            <h3 className="font-medium text-gray-700">Owner: {food?.owner?.name}</h3>

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-3">
                                <button
                                    className="p-2 border rounded-full text-gray-700 hover:bg-gray-200"
                                    onClick={() => qte > 0 && setQte(qte - 1)}
                                >
                                    <FaMinus />
                                </button>
                                <span className="text-lg font-semibold">{qte}</span>
                                <button
                                    className="p-2 border rounded-full text-gray-700 hover:bg-gray-200"
                                    onClick={() => qte < food.quantity && setQte(qte + 1)}
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Action Buttons */}
                            {user.role === "user" && (
                                <div className="space-y-2">
                                    {food?.owner?._id === user._id ? (
                                        <>
                                            <Button color="blue" as={Link} to={`/EditFood/${food._id}`}>
                                                <FaEdit className="mr-2" /> Edit Food
                                            </Button>
                                            <Button color="red" onClick={handleDeleteFood}>
                                                <FaTrash className="mr-2" /> Delete Food
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button color="green" onClick={handleAddToPanier}>
                                                <FaShoppingCart className="mr-2" /> Add to Panier
                                            </Button>
                                            <Button color="red" onClick={handleDeleteFromPanier}>
                                                <FaTrash className="mr-2" /> Remove from Panier
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}

                            {user.role === "admin" && (
                                <Button color="red" onClick={handleDeleteFood}>
                                    <FaTrash className="mr-2" /> Delete Food
                                </Button>
                            )}

                            <Button color="gray" as={Link} to="/IndexFoods">
                                <FaArrowLeft className="mr-2" /> Go Back
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <AnimeSnakeLoading />
            )}
        </div>
    );
};

export default FoodDetails;
