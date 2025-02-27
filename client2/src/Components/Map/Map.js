import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCommandes } from '../../Redux/Actions/CommandeActions';
import { current, getAllUsers } from '../../Redux/Actions/AuthActions';

const MapComponent = ({ latitude , longitude }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const icon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    });
    const redIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    const token = localStorage.getItem("token")
        

    useEffect(() => {
        dispatch((getAllUsers()))
    }, []);
    const users = useSelector((state) => state.AuthReducer.users)

    

    
    
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {users.map((user) => (
                <Marker key={user._id} position={[ user?.addressMap?.latitude, user?.addressMap?.longitude ]} icon={icon}>
                    <Popup>
                        {user.name} {user.lastName}
                    </Popup>
                </Marker>
            ))

            }
            <Marker position={[latitude, longitude]} icon={redIcon}>
                <Popup>
                    Our headquarters
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;


// model : 
// addressMap : {
//     latitude : {
//         type : Number,
//         default : 36.777125
//     },
//     longitude : {
//         type : Number,
//         default : 10.177729
//     }
// }
