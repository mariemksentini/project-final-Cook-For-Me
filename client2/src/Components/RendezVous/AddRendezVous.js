import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { Calendar, Clock, FileText, DollarSign, MapPin } from "lucide-react";
import Datetime from "react-datetime";
import moment from "moment";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-datetime/css/react-datetime.css";
import { current } from "../../Redux/Actions/AuthActions";
import { addRendezVous } from "../../Redux/Actions/RendezVousActions";

const AddRendezVous = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(current());
    }, []);

    const user = useSelector((state) => state.AuthReducer.user);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [type, setType] = useState("online");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(50);
    const [longitude, setLongitude] = useState(user?.addressMap?.longitude || 10.177729);
    const [latitude, setLatitude] = useState(user?.addressMap?.latitude || 36.777125);
    const [link, setLink] = useState("www.googlemeet.com");

    const handleAddRendezVous = (e) => {
        e.preventDefault();
        dispatch(addRendezVous({ startTime, endTime, type, description, price, address: { latitude, longitude }, link }));
    };

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

        return latitude && longitude ? <Marker position={[latitude, longitude]} icon={icon} /> : null;
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Add New Rendezvous</h2>
            <form onSubmit={handleAddRendezVous} className="space-y-4">
                
                {/* Start Time */}
            <div className="flex items-center border p-2 rounded relative">
                <label className="absolute left-3 top-2 cursor-pointer">
                    <Calendar className="w-5 h-5 text-gray-500" />
                </label>
                <Datetime
                    value={startTime ? moment(startTime).toDate() : null}
                    onChange={(date) => setStartTime(moment(date).toISOString())}
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    className="w-full pl-10 focus:outline-none"
                />
            </div>

            {/* End Time */}
            <div className="flex items-center border p-2 rounded relative mt-4">
                <label className="absolute left-3 top-2 cursor-pointer">
                    <Clock className="w-5 h-5 text-gray-500" />
                </label>
                <Datetime
                    value={endTime ? moment(endTime).toDate() : null}
                    onChange={(date) => setEndTime(moment(date).toISOString())}
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    className="w-full pl-10 focus:outline-none"
                />
            </div>


                {/* Type */}
                <div className="flex items-center border p-2 rounded">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full focus:outline-none">
                        <option value="online">Online</option>
                        <option value="in-person">In-Person</option>
                    </select>
                </div>

                {/* Description */}
                <div className="flex items-center border p-2 rounded">
                    <FileText className="w-5 h-5 text-gray-500 mr-2" />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full focus:outline-none resize-none" rows="2"></textarea>
                </div>

                {/* Price */}
                <div className="flex items-center border p-2 rounded">
                    <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full focus:outline-none" />
                </div>

                {/* Map */}
                <div className="border rounded-lg overflow-hidden">
                    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                        <LocationMarker />
                    </MapContainer>
                </div>

                {/* Meeting Link */}
                <div className="flex items-center border p-2 rounded">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Meeting link" className="w-full focus:outline-none" />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Add Rendezvous
                </Button>
            </form>
        </div>
    );
};

export default AddRendezVous;
