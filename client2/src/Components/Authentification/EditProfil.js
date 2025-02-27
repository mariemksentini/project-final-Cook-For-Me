import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { current, modif } from "../../Redux/Actions/AuthActions";
import { Button, Modal } from "flowbite-react"; 
import { Undo2 } from "lucide-react";
import { Datepicker } from "flowbite-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";




const EditProfil = () => {




  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const user = useSelector((state) => state.AuthReducer.user);

  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [birthdate, setBirthdate] = useState(user?.birthdate || "");
  const [houseNum, setHouseNum] = useState(user?.address?.houseNum || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [zipCode, setZipCode] = useState(user?.address?.zipCode || "");
  const [country, setCountry] = useState(user?.address?.country || "Tunisie");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [latitude, setLatitude] = useState(user?.addressMap?.latitude || 36.777125)
  const [longitude, setLongitude] = useState(user?.addressMap?.longitude || 10.177729)

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "")
      setBirthdate(user.birthdate || "");
      setHouseNum(user.address?.houseNum || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
      setZipCode(user.address?.zipCode || "");
      setCountry(user.address?.country || "Tunisie");
      setEmail(user.email || "");
      setImage(user.image || "");
      
    }
  }, [user]);

  const handleModif = async (e) => {
    e.preventDefault();
    const updatedAddress = { houseNum, street, city, zipCode, country };
    const updatedAddressMap = {
      latitude , longitude
    }
    const updatedUser = { name,lastName, birthdate, address: updatedAddress, image, addressMap : updatedAddressMap };
    await dispatch(modif(user._id, updatedUser));
    navigate("/Profil");
  };

  const [base64, setBase64] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };



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
    <>
      {user && (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
          {/* Back Arrow */}
          <button onClick={() => navigate("/Profil")} className="mb-4 flex items-center text-gray-600 hover:text-gray-800">
            <Undo2 className="w-6 h-6 mr-2" />
            <span>Back to Profile</span>
          </button>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Image */}
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <img src={base64 || image} alt="Profile" className="w-32 h-32 rounded-lg border mt-2 object-cover" />
            <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">First</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              {name?.length <= 1 && <p className="text-sm text-red-600">Name must be more than one character</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Birthdate</label>
              <Datepicker 
                  onChange={(date) => setBirthdate(date instanceof Date ? date.toISOString().split('T')[0] : '')} 
                  className="w-full p-2 border rounded" 
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={houseNum}
                onChange={(e) => setHouseNum(e.target.value)}
                placeholder="Enter house number"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              /><br/>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter street name"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
            <div >
              <label htmlFor="addressMap" className="block text-sm font-medium text-gray-700">
                Default address 
              </label>
              <div className="flex space-x-4">
                <input
                  id="longitude"
                  type="text"
                  value={longitude}
                  disabled
                  style={{width : "35%"}}
                  className="mt-1 px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm"
                />
                <input
                  id="latitude"
                  type="text"
                  value={latitude}
                  disabled
                  style={{width : "35%"}}
                  className="mt-1  px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm"
                />
                <Button color="gray" onClick={() => setOpenModal(true)}>
                Choose on map
                </Button>
              </div>
            </div>
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
                <Button onClick={() => setOpenModal(false)}>Save Location</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
              </Modal.Footer>
            </Modal>


            {/* Country Dropdown */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="Tunisie">Tunisie</option>
                <option value="France">France</option>
                <option value="Algerie">Algerie</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button onClick={handleModif} className="w-full bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProfil;
//addressMap