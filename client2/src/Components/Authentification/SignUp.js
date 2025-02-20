import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Register } from '../../Redux/Actions/AuthActions';
import { Button } from 'flowbite-react';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for tabs
    const [activeTab, setActiveTab] = useState("Authentificate");

    // Personal info
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    // Address
    const [houseNum, setHouseNum] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("Tunisie");
    
    // Authentication
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        const address = { houseNum, street, city, zipCode, country };
        dispatch(Register({ name, age, address, email, password }, navigate));
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            {/* Tabs */}
            <div className="flex border-b">
                {["Authentificate", "Coordonnees", "Address"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 text-lg font-semibold focus:outline-none ${
                            activeTab === tab ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {activeTab === "Authentificate" && (
                    <form className="space-y-4">
                        <div>
                            <label>Email address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <p className="text-red-700">{!isValidEmail(email) && "Email must be valid !"}</p>
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </form>
                )}

                {activeTab === "Coordonnees" && (
                    <form className="space-y-4">
                        <div>
                            <label>Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter name"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <p className="text-red-700">{name.length <= 1 && "Name must be more than one character !"}</p>
                        </div>

                        <div>
                            <label>Age</label>
                            <input
                                onChange={(e) => setAge(e.target.value)}
                                type="number"
                                placeholder="Enter Age"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </form>
                )}

                {activeTab === "Address" && (
                    <form className="space-y-4">
                        <input
                            onChange={(e) => setHouseNum(e.target.value)}
                            type="text"
                            placeholder="Enter House number"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <input
                            onChange={(e) => setStreet(e.target.value)}
                            type="text"
                            placeholder="Enter street name"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="Enter city"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                        <input
                            onChange={(e) => setZipCode(e.target.value)}
                            type="text"
                            placeholder="Enter Zip code"
                            className="w-full px-3 py-2 border rounded-md"
                        />

                        <label htmlFor="Country">Choose a country:</label>
                        <select
                            onChange={(e) => setCountry(e.target.value)}
                            name="country"
                            id="Country"
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="Tunisie">Tunisie</option>
                            <option value="France">France</option>
                        </select>

                        <Button onClick={handleSignUp} className="w-full mt-4" >
                            Submit
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;
