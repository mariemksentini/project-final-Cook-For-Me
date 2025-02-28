import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommandesWithLivreurID } from "../../Redux/Actions/CommandeActions";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { Card } from "flowbite-react";

const MapLivreur = () => {
  const dispatch = useDispatch();
  const commandesAsLivreur = useSelector((state) => state.CommandeReducer.commandesAsLivreur);
  const [selectedCommande, setSelectedCommande] = useState(null);

  useEffect(() => {
    dispatch(getCommandesWithLivreurID());
  }, [dispatch]);

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

  return (
    <div className="flex h-screen">
      {/* Carte */}
      <div className="w-1/2 h-full">
        <MapContainer center={[36.777125, 10.177729]} zoom={10} className="h-full w-full ">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedCommande && (
            <>
              <Marker position={[selectedCommande.adressChef.latitude, selectedCommande.adressChef.longitude]} icon={icon}>
                <Popup>
                    Chef: {selectedCommande.chef.name} {selectedCommande.chef.lastName} <br/>
                    Position : {selectedCommande.adressChef.latitude} / {selectedCommande.adressChef.longitude}
                </Popup>
              </Marker>
              <Marker position={[selectedCommande.addressClient.latitude, selectedCommande.addressClient.longitude]} icon={redIcon}>
                <Popup>
                    Client: {selectedCommande.client.name} {selectedCommande.client.lastName} <br/>
                    Position : {selectedCommande.addressClient.latitude} / {selectedCommande.addressClient.longitude}
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </div>

      {/* Liste des commandes */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Accepted orders</h2>
        {commandesAsLivreur.map((commande) => (
          <Card
            key={commande._id}
            className="p-4 text-gray-200 shadow-md rounded-lg mb-4 cursor-pointer"
            style={{ backgroundColor: commande.delivered ? "#14b8a6" : "#b91c1c" }}


            onClick={() => setSelectedCommande(commande)}
          >
            
            <p><strong>ID:</strong> {commande._id}</p>
            <p><strong>Client:</strong> {commande.client?.name}</p>
            <p><strong>Chef:</strong> {commande.chef?.name}</p>
            <p><strong>Delivered:</strong> {commande.delivered ? "Oui" : "Non"}</p>
            <p><strong>Total:</strong> {commande.totalPrice}dt</p>
            <p><strong>Your share:</strong> {Math.round((commande.totalPrice * 0.03) * 100 * 5) / 100}dt</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapLivreur;