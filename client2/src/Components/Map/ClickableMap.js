import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button, Card,  } from 'flowbite-react';

// Define a custom marker icon
const customIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Use a public URL or local asset
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [1, -34],
});

const ClickableMap = () => {
    const [position, setPosition] = useState(null);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                console.log(`Clicked at: Latitude ${e.latlng.lat}, Longitude ${e.latlng.lng}`);
            },
        });

        return position ? (
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Latitude: {position.lat} <br /> Longitude: {position.lng}
                </Popup>
            </Marker>
        ) : null;
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen items-center justify-center">
            {/* Map Section */}
            <div className="w-full md:w-2/3 h-[450px] shadow-lg rounded-lg  border z-50 border-gray-300" style={{width : "200%"}}>
                <MapContainer center={[36.8065, 10.1815]} zoom={13} style={{ height: '450px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>

            {/* Information Section */}
            <Card className="w-full md:w-1/3 p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Selected Location</h2>
                <p className="text-gray-600 mb-2">
                    <strong>Latitude:</strong> {position ? position.lat.toFixed(6) : 'Click on the map'}
                </p>
                <p className="text-gray-600 mb-4">
                    <strong>Longitude:</strong> {position ? position.lng.toFixed(6) : 'Click on the map'}
                </p>
                <Button  size="lg" disabled={!position} className="w-full">
                    Confirm Location
                </Button>
            </Card>
        </div>
    );
};

export default ClickableMap;
