// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Card } from "flowbite-react";
// import { getOneCommandeWithID } from "../../Redux/Actions/CommandeActions";
// import { current } from "../../Redux/Actions/AuthActions";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const CommandeDetails = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const commande = useSelector((state) => state.CommandeReducer.wantedComm);
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         dispatch(getOneCommandeWithID(id));
//         if (token) dispatch(current());
//     }, [dispatch, id, token]);

//     const longitude1 = commande?.addressClient?.longitude ?? null;
//     const latitude1 = commande?.addressClient?.latitude ?? null;
//     const longitude2 = commande?.adressChef?.longitude ?? null;
//     const latitude2 = commande?.adressChef?.latitude ?? null;

//     const icon1 = new L.Icon({
//         iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//         shadowSize: [41, 41],
//     });

//     if (!commande || Object.keys(commande).length === 0) return <p>Loading...</p>;

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Commande ID: {commande._id}</h1>
//             <p><strong>Chef:</strong> {commande.chef?.name} ({commande.chef?.email})</p>
//             <p><strong>Client:</strong> {commande.client?.name} ({commande.client?.email})</p>

//             <h2 className="text-xl font-bold mt-4">Produits:</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {commande.products?.map(({ product, qte, priceTot }, index) => (
//                     <Card key={index} style={{ width: "700px" }} className="p-4">
//                         <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
//                         <h3 className="font-semibold">{product.name}</h3>
//                         <p>Quantité: {qte}</p>
                        
//                         <p>Prix unitaire: {product.price}€</p>
//                         <p><strong>Total:</strong> {priceTot}€</p>
//                     </Card>
//                 ))}
//             </div>

//             <p>Feedback: {commande.feedBack}</p>

//             {longitude1 && latitude1 && longitude2 && latitude2 && (
//                 <MapContainer center={[(latitude1+latitude2)/2, (longitude1+longitude2)/2]} zoom={13} style={{ height: '400px', width: '100%' }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[latitude1, longitude1]} icon={icon1} >
//                         <Popup>
//                             Client : {commande?.client?.name}
//                         </Popup>
//                     </Marker>
//                     <Marker position={[latitude2, longitude2]} icon={icon1} >
//                         <Popup>
//                             Chef : {commande?.chef?.name}
//                         </Popup>
//                     </Marker>
//                 </MapContainer>
//             )}

//             <h2 className="text-xl font-bold mt-4">Total Commande: {commande.totalPrice}€</h2>
//         </div>
//     );
// };

// export default CommandeDetails;


import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { getOneCommandeWithID } from "../../Redux/Actions/CommandeActions";
import { current } from "../../Redux/Actions/AuthActions";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Star, Undo2 } from "lucide-react";
import "leaflet-routing-machine";

const CommandeDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const commande = useSelector((state) => state.CommandeReducer.wantedComm);
    const user = useSelector((state)=> state.AuthReducer.user)
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getOneCommandeWithID(id));
        if (token) dispatch(current());
    }, [dispatch, id, token]);

    var lastPage = "";
    switch (user?.role) {
        case "admin":
            lastPage = "/CommandesAdmin";
            break;
        case "livreur":
            lastPage = "/CommandesAsLivreur";
            break;
        case "user":
            if (user?._id === commande?.client?._id) {
                lastPage = "/CommandesAsClient";
            } else if (user?._id === commande?.chef?._id) {
                lastPage = "/CommandesAsChef";
            } else {
                lastPage = "/";
            }
            break;
        default:
            lastPage = "/";
    }

    


    const longitude1 = commande?.addressClient?.longitude ?? null;
    const latitude1 = commande?.addressClient?.latitude ?? null;
    const longitude2 = commande?.adressChef?.longitude ?? null;
    const latitude2 = commande?.adressChef?.latitude ?? null;

    const icon1 = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

    

    // useEffect(() => {
    //     if (longitude1 && latitude1 && longitude2 && latitude2) {
    //         const map = L.map("map").setView([(latitude1 + latitude2) / 2, (longitude1 + longitude2) / 2], 13);
    //         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    
    //         L.Routing.control({
    //             waypoints: [
    //                 L.latLng(latitude2, longitude2), // Chef
    //                 L.latLng(latitude1, longitude1), // Client
    //             ],
    //             routeWhileDragging: true,
    //         }).addTo(map);
    //     }
    // }, [longitude1, latitude1, longitude2, latitude2]);

    // useEffect(() => {
    //     if (longitude1 && latitude1 && longitude2 && latitude2) {
    //         const map = L.map("map").setView([(latitude1 + latitude2) / 2, (longitude1 + longitude2) / 2], 13);
    //         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    
    //         L.marker([latitude1, longitude1], { icon: icon1 }).addTo(map)
    //             .bindPopup(`Client : ${commande?.client?.name}`)
    //             .openPopup();
    
    //         L.marker([latitude2, longitude2], { icon: icon1 }).addTo(map)
    //             .bindPopup(`Chef : ${commande?.chef?.name}`)
    //             .openPopup();
    
    //             L.Routing.control({
    //                 waypoints: [
    //                     L.latLng(latitude2, longitude2), // Chef
    //                     L.latLng(latitude1, longitude1), // Client
    //                 ],
    //                 routeWhileDragging: true,
    //                 createMarker: () => null, // Supprime les marqueurs automatiques de Routing
    //                 show: false // Désactive l'affichage du panneau avec les instructions
    //             }).addTo(map);
                
    //     }
    // }, [longitude1, latitude1, longitude2, latitude2]);



const mapRef = useRef(null); // Stocke l'instance de la carte

useEffect(() => {
    if (longitude1 && latitude1 && longitude2 && latitude2) {
        if (!mapRef.current) { // Empêche la réinitialisation
            mapRef.current = L.map("map").setView([(latitude1 + latitude2) / 2, (longitude1 + longitude2) / 2], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);

            L.marker([latitude1, longitude1], { icon: icon1 }).addTo(mapRef.current)
                .bindPopup(`Client : ${commande?.client?.name}`)
                .openPopup();

            L.marker([latitude2, longitude2], { icon: icon1 }).addTo(mapRef.current)
                .bindPopup(`Chef : ${commande?.chef?.name}`)
                .openPopup();

            L.Routing.control({
                waypoints: [
                    L.latLng(latitude2, longitude2), // Chef
                    L.latLng(latitude1, longitude1), // Client
                ],
                routeWhileDragging: true,
                createMarker: () => null,
                show: false
            }).addTo(mapRef.current);
        }
    }
}, [longitude1, latitude1, longitude2, latitude2]);

    

    if (!commande || Object.keys(commande).length === 0) return <p className="text-center text-gray-500">Chargement...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
            <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => navigate(lastPage)}>
                <Undo2 className="mr-2" /> Back to Commandes
            </button>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Détails de la commande</h1>


            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Commande ID: {commande._id}</h2>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong className="text-gray-600">Chef:</strong> {commande.chef?.name} {commande.chef?.lastName} ({commande.chef?.email})</p>
                    <p><strong className="text-gray-600">Client:</strong> {commande.client?.name} {commande.client?.lastName} ({commande.client?.email})</p>
                    {commande.livreur 
                    ?
                    <p><strong className="text-gray-600">Livreur:</strong> {commande.livreur?.name} {commande.livreur?.lastName} ({commande.livreur?.email})</p>
                    :
                    <p><strong className="text-gray-600">Livreur:</strong> No livreur yet.</p>
                    }
                    <p>
                        <span className={`px-2 mx-1 py-1 rounded-md text-white ${
                            commande.status === "Accepted" ? "bg-green-500" :
                            commande.status === "Rejected" ? "bg-red-600" :
                            "bg-gray-500"
                        }`}>
                            {commande.status}
                        </span>
                        <span className={`px-2 mx-1 py-1 rounded-md text-white ${
                            commande.delivered ? "bg-green-500" : "bg-red-600"
                        }`}>
                            {commande.delivered ? "Delivered" : "Not delivered"}
                        </span>
                        <span className={`px-2 mx-1 py-1 rounded-md text-white ${
                            commande.confirmed ? "bg-green-500" : "bg-red-600"
                        }`}>
                            {commande.confirmed ? "Confirmed" : "Not Confirmed"}
                        </span>

                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-6 text-gray-800">Produits commandés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {commande.products?.map(({ product, qte, priceTot }, index) => (
                    <Card key={index} className="p-4 border rounded-lg shadow-md bg-white">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-gray-600">Quantité: {qte}</p>
                        <p className="text-gray-600">Prix unitaire: {product.price}€</p>
                        <p className="font-semibold text-gray-800">Total: {priceTot}€</p>
                    </Card>
                ))}
            </div>

            {commande.feedBack && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Feedback</h2>
                    <p className="text-gray-600 mt-2">{commande.feedBack}</p>
                    {/* Rating Section */}
                    <div className="mt-4 flex items-center space-x-2 text-gray-800">
                        <h3 className="font-semibold text-lg">Rating:</h3>
                        {commande.rating !== 0 ? (
                            <>
                                <span className="text-lg font-semibold">{commande.rating}</span>
                                <Star className="w-5 h-5 text-yellow-500" />
                            </>
                        ) : (
                            <span className="text-gray-400">No Ratings</span>
                        )}
                    </div>
                </div>
            )}

            {longitude1 && latitude1 && longitude2 && latitude2 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Localisation</h2>
                    {/* <MapContainer center={[(latitude1 + latitude2) / 2, (longitude1 + longitude2) / 2]} zoom={13} className="mt-4 rounded-lg shadow-md" style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[latitude1, longitude1]} icon={icon1}>
                            <Popup>Client : {commande?.client?.name}</Popup>
                        </Marker>
                        <Marker position={[latitude2, longitude2]} icon={icon1}>
                            <Popup>Chef : {commande?.chef?.name}</Popup>
                        </Marker>
                    </MapContainer> */}
                    <div id="map" style={{ height: "400px", width: "100%" }}></div>

                </div>
            )}

            <h2 className="text-2xl font-semibold mt-6 text-center text-gray-800">Total de la commande:<span className="text-green-900"> {commande.totalPrice}dt</span></h2>
        </div>
    );
};

export default CommandeDetails;