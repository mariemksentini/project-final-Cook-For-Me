import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { current, logOut, modif } from "../Redux/Actions/AuthActions";
import AnimeSnakeLoading from "./Loading/AnimeSnakeLoading";
import { Button, Dropdown } from "flowbite-react";
import { MoreVertical, ShoppingCart, Star } from "lucide-react";
import LineChart from "./ChartComp";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Profil = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(current());
    }, []);

    const user = useSelector((state) => state.AuthReducer.user);
    const earnings = user.earnings

    // Calculate average rating (excluding null values)
    const validRatings = user?.rate?.filter((r) => r !== null);
    const averageRating =
        validRatings?.length > 0
            ? (validRatings.reduce((acc, val) => acc + val, 0) / validRatings.length).toFixed(1)
            : "No Ratings";
    
    const handleArchieve =async()=>{
        const updatedUser = { ...user, archived: !user.archived };
        await dispatch(modif(user._id, updatedUser))
        await navigate('/')
        await dispatch(logOut())
    }

    const icon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

    const {latitude} = user?.addressMap?.latitude
    const {longitude} = user?.addressMap?.longitude

   
   

    return (
        <>
            {user ? (
                <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg relative">
                    {/* Top Bar with Kebab Menu & Cart Icon */}
                    <div className="flex justify-between items-center mb-4">
                        {/* Kebab Menu */}
                        <Dropdown
                            label={<MoreVertical style={{ marginLeft : "4px"}} className="w-6 h-6  cursor-pointer text-gray-600" />}
                            placement="bottom-start"
                            arrowIcon={false}
                            inline
                        >
                            <Dropdown.Item as={Link} to="/EditProfil">Modify</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/DeleteUser">Delete Profile</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleArchieve()}>Archive</Dropdown.Item>
                        </Dropdown>

                        {/* Cart Icon */}
                        {user.role === "user" && (
                            <Link to="/IndexPanier">
                                <ShoppingCart style={{    marginRight: "15px"}} className="w-6 h-6 text-gray-700 hover:text-gray-900 transition" />
                            </Link>
                        )}
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center space-x-6 p-4 border-b border-gray-300">
                        {/* Profile Image */}
                        <img
                            src={user.image}
                            alt="Profile"
                            className="w-32 h-32 rounded-lg border-4 border-teal-500 object-cover"
                        />
                    </div>

                    {/* User Info */}
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                        <h1 className="text-3xl font-bold text-gray-900 text-center">{user.name} {user.lastName}</h1>
                        <p className="text-lg text-gray-600 text-center">{user.email}</p>
                        <p className="text-lg text-gray-600">Birthday: {user.birthdate}</p> {/* Birthdate */}
                        <p className="text-lg text-gray-600">Role: {user.role}</p> {/* Phone Number */}
                    </div>

                    {/* Address Section */}
                    {user?.address?.country && (
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg text-teal-700">Address:</h3>
                            <p>{user?.address?.houseNum} {user?.address?.street}</p>
                            <p>{user?.address?.city}, {user?.address?.zipCode}</p>
                            <p>{user?.address?.country}</p>
                            <p>{user?.address?.state}</p> {/* State */}
                        </div>
                    )}

                    {/* Rating Section */}
                    <div className="mt-4 flex items-center space-x-2 text-gray-800">
                        <h3 className="font-semibold text-lg">Rating:</h3>
                        {averageRating !== "No Ratings" ? (
                            <>
                                <span className="text-lg font-semibold">{averageRating}</span>
                                <Star className="w-5 h-5 text-yellow-500" />
                            </>
                        ) : (
                            <span className="text-gray-400">No Ratings</span>
                        )}
                    </div>

                    

                    {/* Location */}
                    <MapContainer center={[user?.addressMap?.latitude, user?.addressMap?.longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[user?.addressMap?.latitude, user?.addressMap?.longitude]} icon={icon}>
                            <Popup>
                                {user.name}, you are here!
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            ) : (
                <AnimeSnakeLoading />
            )}
        </>
    );
};
export default Profil