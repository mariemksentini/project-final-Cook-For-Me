// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { editOneFood, getOneFood } from '../../Redux/Actions/FoodActions';
// import { Button } from 'flowbite-react';
// import { FloatingLabel } from 'flowbite-react';
// const EditFood = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { id } = useParams();

//     useEffect(() => {
//         dispatch(getOneFood(id));
//     }, [id, dispatch]);

//     const food = useSelector(state => state.FoodReducer.wantedFood);

//     const [name, setName] = useState(food?.name || '');
//     const [type, setType] = useState(food?.type || 'Plat');
//     const [imageUrl, setImageUrl] = useState(food?.imageUrl || '');
//     const [biography, setBiography] = useState(food?.biography || '');
//     const [quantity, setQuantity] = useState(food?.quantity || '')
//     const [price, setPrice] = useState(food?.price || '')

//     const handleEditFood = async (e) => {
//         e.preventDefault();
//         await dispatch(editOneFood(id, { name, type, imageUrl, biography }));
//         navigate('/IndexFoods')
//     };

//     return (
//         <form onSubmit={handleEditFood} className="space-y-4">
//             <div className="flex flex-col">
//                 <label htmlFor="name" className="mb-1 text-lg font-medium">Food name</label>
//                 <FloatingLabel 
//                     id="name" 
//                     variant="outlined" 
//                     value={name} 
//                     onChange={(e) => setName(e.target.value)} 
//                     placeholder="Enter food name" 
//                     className="border rounded p-2"
//                 />
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="type" className="mb-1 text-lg font-medium">Choose a Type:</label>
//                 <select 
//                     id="type" 
//                     value={type} 
//                     onChange={(e) => setType(e.target.value)} 
//                     className="border rounded p-2"
//                 >
//                     <option value="Plat">Plat</option>
//                     <option value="Drink">Drink</option>
//                 </select>
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="imageUrl" className="mb-1 text-lg font-medium">Image URL</label>
//                 <FloatingLabel 
//                     id="imageUrl" 
//                     variant="outlined" 
//                     value={imageUrl} 
//                     onChange={(e) => setImageUrl(e.target.value)} 
//                     placeholder="Enter food image URL" 
//                     className="border rounded p-2"
//                 />
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="biography" className="mb-1 text-lg font-medium">Food biography</label>
//                 <FloatingLabel 
//                     id="biography" 
//                     variant="outlined" 
//                     value={biography} 
//                     onChange={(e) => setBiography(e.target.value)} 
//                     placeholder="Enter food biography" 
//                     className="border rounded p-2"
//                 />
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="quantity" className="mb-1 text-lg font-medium">Quantity</label>
//                 <FloatingLabel 
//                     id="quantity" 
//                     variant="outlined"
//                     value={quantity} 
//                     onChange={(e) => setQuantity(e.target.value)} 
//                     placeholder="Enter food quantity" 
//                     className="border rounded p-2"
//                 />
//             </div>

//             <div className="flex flex-col">
//                 <label htmlFor="price" className="mb-1 text-lg font-medium">Price</label>
//                 <FloatingLabel 
//                     id="price" 
//                     variant="outlined"
//                     value={price} 
//                     onChange={(e) => setPrice(e.target.value)} 
//                     placeholder="Enter food price" 
//                     className="border rounded p-2"
//                 />
//             </div>

//             <Button 
//                 type="submit" 
//                 className="w-full text-white py-2 rounded"
//             >
//                 Edit Food
//             </Button>

//             <Button 
//                 as={Link} 
//                 to="/IndexFoods" 
//                 className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
//             >
//                 Go Back
//             </Button>
//         </form>
//     );
// };

// export default EditFood;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editOneFood, getOneFood } from "../../Redux/Actions/FoodActions";
import { Button } from "flowbite-react";
import { Image, ClipboardList, DollarSign, Hash, Type, FileText } from "lucide-react";

const EditFood = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneFood(id));
    }, [id, dispatch]);

    const food = useSelector(state => state.FoodReducer.wantedFood);

    const [name] = useState(food?.name || "");
    const [type, setType] = useState(food?.type || "Plat");
    const [image, setImage] = useState(food?.image || "/food.jpg");
    const [biography, setBiography] = useState(food?.biography || "");
    const [quantity, setQuantity] = useState(food?.quantity || "");
    const [price] = useState(food?.price || "");
    const [base64, setBase64] = useState("");

    const handleEditFood = async (e) => {
        e.preventDefault();
        await dispatch(editOneFood(id, { name, type, image, biography, quantity, price }));
        navigate("/IndexFoods");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setBase64(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Edit Food</h2>
            <form onSubmit={handleEditFood} className="space-y-4">
                {/* Name (Unchangeable) */}
                <div className="flex items-center border p-2 rounded bg-gray-100 cursor-not-allowed">
                    <Type className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="text" value={name} disabled className="w-full bg-transparent focus:outline-none" />
                </div>
                
                {/* Type */}
                <div className="flex items-center border p-2 rounded">
                    <ClipboardList className="w-5 h-5 text-gray-500 mr-2" />
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full focus:outline-none">
                        <option value="Plat">Plat</option>
                        <option value="Drink">Drink</option>
                    </select>
                </div>
                
                {/* Image */}
                <div className="flex items-center border p-2 rounded">
                    <Image className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="file" onChange={handleFileChange} className="w-full focus:outline-none" />
                </div>
                <img src={base64 || image} alt="Food img" className="rounded-lg border mt-2 object-cover" />
                
                {/* Biography */}
                <div className="flex items-center border p-2 rounded">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    <textarea value={biography} onChange={(e) => setBiography(e.target.value)} placeholder="Food biography" className="w-full focus:outline-none resize-none" rows="2"></textarea>
                </div>
                
                {/* Quantity */}
                <div className="flex items-center border p-2 rounded">
                    <Hash className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="w-full focus:outline-none" />
                </div>
                
                {/* Price (Unchangeable) */}
                <div className="flex items-center border p-2 rounded bg-gray-100 cursor-not-allowed">
                    <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="number" value={price} disabled className="w-full bg-transparent focus:outline-none" />
                </div>
                
                {/* Submit Button */}
                <Button type="submit" className="w-full">Edit Food</Button>
                
                {/* Back Button */}
                <Button as={Link} to="/IndexFoods" className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded">Go Back</Button>
            </form>
        </div>
    );
};

export default EditFood;
