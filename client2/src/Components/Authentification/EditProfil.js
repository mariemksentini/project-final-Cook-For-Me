import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { current, modif } from "../../Redux/Actions/AuthActions";
import { Button } from "flowbite-react/components/Button"; // Import Flowbite components

const EditProfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(current());
  }, []);
  const user = useSelector((state) => state.AuthReducer.user);

  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [houseNum, setHouseNum] = useState(user?.address?.houseNum || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [zipCode, setZipCode] = useState(user?.address?.zipCode || "");
  const [country, setCountry] = useState(user?.address?.country || "Tunisie");
  const [email, setEmail] = useState(user?.email || "");

  

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAge(user.age || "");
      setHouseNum(user.address?.houseNum || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
      setZipCode(user.address?.zipCode || "");
      setCountry(user.address?.country || "Tunisie");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleModif = async (e) => {
    e.preventDefault();
    const updatedAddress = { houseNum, street, city, zipCode, country };
    const updatedUser = { name, age, address: updatedAddress };
    console.log("Modifying user:", updatedUser);
    await dispatch(modif(user._id, updatedUser));
    navigate("/Profil");
  };

  return (
    <>
      {user && (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            />
            {name?.length <= 1 && (
              <p className="text-sm text-red-600">Name must be more than one character</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            />
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter street name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            />
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter zip code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            >
              <option value="Tunisie">Tunisie</option>
              <option value="France">France</option>
              <option value="Algerie">Algerie</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleModif}
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default EditProfil;