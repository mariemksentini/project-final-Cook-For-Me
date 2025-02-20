import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFood } from '../../Redux/Actions/FoodActions';
import { Button, FloatingLabel } from 'flowbite-react';

const CreateFood = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("Plat");
    const [imageUrl, setImageUrl] = useState("example.com");
    const [biography, setBiography] = useState("");
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    const handleCreateFood = (e) => {
        e.preventDefault();
        dispatch(addFood({ name, type, imageUrl, biography, quantity, price }, navigate));
    };

    return (
        <form onSubmit={handleCreateFood} className="space-y-4">
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
                onClick={handleCreateFood} 
                className="w-full  text-white py-2 rounded"
            >
                Add Food
            </Button>
        </form>
    );
};

export default CreateFood;
