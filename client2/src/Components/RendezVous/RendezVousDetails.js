// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { deleteRendezVous, getOneRendezVous, updateRendezVous } from "../../Redux/Actions/RendezVousActions";
// import { Card } from "flowbite-react";
// import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
// import moment from "moment";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { current } from "../../Redux/Actions/AuthActions";

// const RendezVousDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const oneRendezVous = useSelector((state) => state.rendezVousReducer.oneRendezVous);
//   const user = useSelector((state)=> state.AuthReducer.user)

//   const handleReserver = () => {
//     dispatch(updateRendezVous(id, { client: user._id }));
//   };
  
//   const handlDelete =()=>{
//     dispatch(deleteRendezVous(id))
//   }

//   useEffect(() => {
//     dispatch(getOneRendezVous(id));
//     dispatch(current())
//   }, []);

//   if (!oneRendezVous) return <p className="text-center">Loading...</p>;

//   const {
//     startTime,
//     endTime,
//     type,
//     description,
//     price,
//     privateChef,
//     client,
//     address,
//     link,
//   } = oneRendezVous;

//   const icon = new L.Icon({
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Rendezvous Details</h2>
      
//       <Card className="p-4">
//         <p className="flex items-center">
//           <Calendar className="w-5 h-5 text-gray-500 mr-2" />
//           <strong>Date:</strong> {moment(startTime).format("DD/MM/YYYY")}
//         </p>
//         <p className="flex items-center">
//           <Clock className="w-5 h-5 text-gray-500 mr-2" />
//           <strong>Time:</strong> {moment(startTime).format("HH:mm")} - {moment(endTime).format("HH:mm")}
//         </p>
//         <p className="flex items-center">
//           <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
//           <strong>Price:</strong> ${price}
//         </p>
//         <p><strong>Type:</strong> {type}</p>
//         <p><strong>Description:</strong> {description || "No description provided"}</p>
//         <p><strong>Private Chef:</strong> {privateChef?.name} {privateChef?.lastName}</p>
//         <p><strong>Client:</strong> {client?.name} {client?.lastName}</p>
//         {!client && user.role === 'user' && <button onClick={()=> handleReserver()}>reserver</button> }
//         {user._id === privateChef?._id && <button onClick={()=>handlDelete()}>delete</button>}

//         {type === "in-person" && address && (
//           <div className="mt-4">
//             <p className="flex items-center">
//               <MapPin className="w-5 h-5 text-gray-500 mr-2" />
//               <strong>Location:</strong>
//             </p>
//             <MapContainer center={[address.latitude, address.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <Marker position={[address.latitude, address.longitude]} icon={icon} />
//             </MapContainer>
//           </div>
//         )}

//         {type === "online" && link && (
//           <p className="mt-4">
//             <strong>Meeting Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a>
//           </p>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default RendezVousDetails;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRendezVous, getAllRendezVous, getOneRendezVous, updateRendezVous } from "../../Redux/Actions/RendezVousActions";
import { Button, Card, Dropdown } from "flowbite-react";
import { Calendar, Clock, MapPin, DollarSign, MoreVertical } from "lucide-react";
import moment from "moment";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { current } from "../../Redux/Actions/AuthActions";

const RendezVousDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const oneRendezVous = useSelector((state) => state.rendezVousReducer.oneRendezVous);
  const user = useSelector((state) => state.AuthReducer.user);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getOneRendezVous(id));
    dispatch(current());
  }, []);

  if (!oneRendezVous) return <p className="text-center">Loading...</p>;

  const {
    startTime,
    endTime,
    type,
    description,
    price,
    privateChef,
    client,
    address,
    link,
  } = oneRendezVous;

  const handleReserver = () => {
    dispatch(updateRendezVous(id, { client: user._id }));
  };

  const handleDelete = () => {
    dispatch(deleteRendezVous(id));
    navigate("/GeneralCalendar");
    dispatch(getAllRendezVous())
  };

  const icon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Rendezvous Details</h2>
      
      {user._id === privateChef?._id && (
        <div className="absolute top-4 right-4">
          <Dropdown label={<MoreVertical className="cursor-pointer w-6 h-6" />} inline>
            <Dropdown.Item onClick={() => navigate(`/EditRendezVous/${id}`)}>Modify</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete} className="text-red-500">Delete</Dropdown.Item>
          </Dropdown>
        </div>
      )}
      
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <img src={privateChef?.image} alt="Chef Profile" className="w-12 h-12 rounded-full" />
          <p className="font-semibold">{privateChef?.name} {privateChef?.lastName}</p>
        </div>
        <p className="flex items-center mt-2">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <strong>Date:</strong> {moment(startTime).format("DD/MM/YYYY")}
        </p>
        <p className="flex items-center">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <strong>Time:</strong> {moment(startTime).format("HH:mm")} - {moment(endTime).format("HH:mm")}
        </p>
        <p className="flex items-center">
          <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
          <strong>Price:</strong> ${price}
        </p>
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Description:</strong> {description || "No description provided"}</p>
        <p><strong>Client:</strong> {client ? `${client.name} ${client.lastName}` : "No client yet"}</p>
        
        

        {type === "in-person" && address && (
          <div className="mt-4">
            <p className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <strong>Location:</strong>
            </p>
            <MapContainer center={[address.latitude, address.longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[address.latitude, address.longitude]} icon={icon} />
            </MapContainer>
          </div>
        )}

        {type === "online" && link && (
          <p className="mt-4">
            <strong>Meeting Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{link}</a>
          </p>
        )}
        {!client && user.role === 'user' && (
          <Button onClick={handleReserver} className="mt-4  px-4 py-2 rounded ">
            Reserve
          </Button>
        )}
      </Card>
    </div>
  );
};

export default RendezVousDetails;