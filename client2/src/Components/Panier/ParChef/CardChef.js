import { useDispatch, useSelector } from "react-redux";
import { getOwnPanier, updatePanier } from "../../../Redux/Actions/PanierActions";
import { current, getOneUser } from "../../../Redux/Actions/AuthActions";
import { useEffect, useState } from "react";
import { addCommande } from "../../../Redux/Actions/CommandeActions";
import { useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "flowbite-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CardChef = ({ chef, products, chefEmail, ownPanier }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(current());
        dispatch(getOneUser(chef))
    }, []);

    const user = useSelector(state => state.AuthReducer.user);
    const chefDetails = useSelector((state)=> state.AuthReducer.wantedUser)
    const [longitude, setLongitude] = useState(user?.addressMap?.longitude)
    const [latitude, setLatitude] = useState(user?.addressMap?.latitude)
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
            addressClient : {
                latitude, longitude
            },
            addressChef : {
                latitude : chefDetails.addressMap.latitude,
                longitude : chefDetails.addressMap.longitude
            }
            
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
        await setOpenModal(false)
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

    const totalPrice = products.reduce((sum, el) => sum + el.qte * el?.product?.price, 0);

      //map
    const icon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    });
      
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
            setLatitude(e.latlng.lat);
            setLongitude(e.latlng.lng);
            },
        });
        
        return latitude && longitude ? (
            <Marker position={[latitude, longitude]} icon={icon} />
        ) : null;
    };
    return (
        <div className="flex justify-center py-10">
            <Card className="max-w-3xl w-full p-6 shadow-lg bg-white rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Chef: <span className="text-blue-600">{chefEmail}</span>
                </h2>

                <div className="space-y-5">
                    {products.map((el) => (
                        <div  key={el?._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                            <div onClick={()=> navigate(`/FoodDetails/${el.product._id}`)} className=" cursor-pointer">
                                <h3 className="text-lg font-medium text-gray-900">{el?.product?.name}</h3>
                                <p className="text-gray-700">Quantity: <span className="font-semibold">{el?.qte}</span></p>
                                <p className="text-gray-700">Total price: <span className="font-semibold">{el?.prixTot} DT</span></p>
                            </div>
                            <Button 
                                onClick={() => handleDeleteFromPanier(el?.product?._id)} 
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
                    Total Price: <span className="text-green-600">{totalPrice?.toFixed(2)} DT</span>
                </div>

                <div className="mt-6 flex justify-center">
                    <Button 
                        onClick={() => setOpenModal(true)}
                        color="success"
                        size="lg"
                        className="w-full"
                    >
                        Select location
                    </Button>
                </div>
            </Card>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Select Your Location</Modal.Header>
              <Modal.Body>
                <div className="h-64 w-full">
                <MapContainer center={[latitude, longitude]} position={[latitude, longitude]} zoom={13} style={{ height: '300px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={[latitude, longitude]}/>
                </MapContainer>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={(e) => handleCommander(e)}>Confirm order</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
              </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CardChef;
