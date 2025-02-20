import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editOneFood, getOneFood } from '../../Redux/Actions/FoodActions';
import { Button } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
const EditFood = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneFood(id));
    }, [id, dispatch]);

    const food = useSelector(state => state.FoodReducer.wantedFood);

    const [name, setName] = useState(food?.name || '');
    const [type, setType] = useState(food?.type || 'Plat');
    const [imageUrl, setImageUrl] = useState(food?.imageUrl || '');
    const [biography, setBiography] = useState(food?.biography || '');
    const [quantity, setQuantity] = useState(food?.quantity || '')
    const [price, setPrice] = useState(food?.price || '')

    const handleEditFood = async (e) => {
        e.preventDefault();
        await dispatch(editOneFood(id, { name, type, imageUrl, biography }));
        navigate('/IndexFoods')
    };

    return (
        <form onSubmit={handleEditFood} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-lg font-medium">Food name</label>
                <FloatingLabel 
                    id="name" 
                    variant="outlined" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter food name" 
                    className="border rounded p-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="type" className="mb-1 text-lg font-medium">Choose a Type:</label>
                <select 
                    id="type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    className="border rounded p-2"
                >
                    <option value="Plat">Plat</option>
                    <option value="Drink">Drink</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="imageUrl" className="mb-1 text-lg font-medium">Image URL</label>
                <FloatingLabel 
                    id="imageUrl" 
                    variant="outlined" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="Enter food image URL" 
                    className="border rounded p-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="biography" className="mb-1 text-lg font-medium">Food biography</label>
                <FloatingLabel 
                    id="biography" 
                    variant="outlined" 
                    value={biography} 
                    onChange={(e) => setBiography(e.target.value)} 
                    placeholder="Enter food biography" 
                    className="border rounded p-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="quantity" className="mb-1 text-lg font-medium">Quantity</label>
                <FloatingLabel 
                    id="quantity" 
                    variant="outlined"
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    placeholder="Enter food quantity" 
                    className="border rounded p-2"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="price" className="mb-1 text-lg font-medium">Price</label>
                <FloatingLabel 
                    id="price" 
                    variant="outlined"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="Enter food price" 
                    className="border rounded p-2"
                />
            </div>

            <Button 
                type="submit" 
                className="w-full text-white py-2 rounded"
            >
                Edit Food
            </Button>

            <Button 
                as={Link} 
                to="/IndexFoods" 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
            >
                Go Back
            </Button>
        </form>
    );
};

export default EditFood;
