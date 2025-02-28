

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Register } from '../../Redux/Actions/AuthActions';
import { Button, Datepicker, Modal } from 'flowbite-react';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [openModalOne, setOpenModalOne] = useState(false);
    const [openModalTwo, setOpenModalTwo] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('2025-01-01');
    const [houseNum, setHouseNum] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [role, setRole] = useState('')
    const [country, setCountry] = useState('Tunisie');

    const [confTerms, setConfTerms] = useState(false)
    const [confPolicy, setConfPolicy] = useState(false)

    const handleTerms =()=>{
        setConfTerms(true)
        setOpenModalTwo(false)

    }

    const handlePolicy =()=>{
        setConfPolicy(true)
        setOpenModalOne(false)

    }

    const handleNext = () => {
        (email && password && confirmPassword && firstName && lastName ) && setStep(step + 1);
    }
    const handleSubmit = async(e) => {
        console.log(birthdate)
        const address = await { houseNum, street, city, zipCode, country };
        dispatch(Register({ name: firstName, lastName ,birthdate, address, email, password, role: role || "user" }, navigate));

    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://tenor.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    

    return (
        <div className="flex items-center justify-center bg-gray-100" style={{height : "87vh"}}>
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex">
                <div className="w-1/2 flex flex-col items-center justify-center  p-6 rounded-l-lg">
                <div className="gif-container">
                    <div 
                        className="tenor-gif-embed" 
                        data-postid="25055361" 
                        data-share-method="host" 
                        data-aspect-ratio="0.965625" 
                        data-width="100%">
                        {/* <a style={{opacity : "0%"}} href="https://tenor.com/view/100-gif-25055361">100 GIF</a>  
                        <a style={{opacity : "0%"}} href="https://tenor.com/search/100-gifs">100 GIFs</a> */}
                    </div>
                </div>
                
                    <p className="mt-4 z-20 text-gray-700">Have an account? 
                        <span onClick={() => navigate('/SignIn')} className="text-teal-600 cursor-pointer underline ml-1">Sign in</span>
                    </p>
                </div>
                <div className="w-1/2 p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-1/2  border rounded" />
                                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-1/2  border rounded" />
                            </div>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded" />
                            <p className="text-red-700">{email && !isValidEmail(email) && "Email must be valid !"}</p>
                            <div className="flex space-x-4">
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-1/2 p-2 border rounded" />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-1/2 p-2 border rounded" />
                                
                            </div><br/>
                            <span className="text-red-700">
                                {password && (!(password.match(/^(?=(.*\d){3,})(?=.*[\W_]).{6,}$/)) && password.length < 8 &&
                                "Password must be at least 8 characters and includes 3 numbers and 1 special character")
                                }
                            
                            </span>


                            <p className="text-red-700">{(confirmPassword && password !== confirmPassword) && "Password does not match !"}</p>
                            <Button onClick={handleNext} className={`w-full mt-4 ${!(email && password && confirmPassword && firstName && lastName ) ? 'opacity-50 cursor-not-allowed' : ''} `}>Next</Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <Datepicker 
                                    onChange={(date) => setBirthdate(date instanceof Date ? date.toISOString().split('T')[0] : '')} 
                                    className="w-1/2 rounded border-black " 
                                    style={{height : "41.6px"}}
                                />
                                <select
                                    onChange={(e) => setRole(e.target.value)}
                                    name="role"
                                    id="Role"
                                    className="w-1/2 px-3 py-2 border rounded-md"
                                    defaultValue="Choose role" // Ajoute cette ligne
                                >
                                    <option value="user">User</option>
                                    <option value="livreur">Livreur</option>
                                </select>

                            </div>

                            <div className="flex space-x-4 ">
                                <input type="text" placeholder="House Number"  onChange={(e) => setHouseNum(e.target.value)}  className="w-1/2 p-2 border rounded" />
                                <input type="text" placeholder="Street Name"  onChange={(e) => setStreet(e.target.value)}  className="w-1/2 p-2 border rounded" />
                            </div>
                            <div className="flex space-x-4">
                                <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} style={{ width : "124px"}} className="w-1/3 p-2 border rounded" />
                                <input type="text" placeholder="Postal Code"  onChange={(e) => setZipCode(e.target.value)} style={{ width : "124px"}} className="w-1/3 p-2 border rounded" />
                                <select
                                    onChange={(e) => setCountry(e.target.value)}
                                    name="country"
                                    id="Country"
                                    className="px-3 py-2 border rounded-md"
                                    style={{ width : "124px"}}
                                >
                                    <option value="Tunisie">Tunisie</option>
                                    <option value="Algerie">Algerie</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                </select>
                            </div>
                            <p className="text-sm text-gray-600">By signing up, you agree to our 
                                <span className="text-teal-600 cursor-pointer underline ml-1" onClick={() => setOpenModalOne(true)}>Privacy Policy</span> and 
                                <span className="text-teal-600 cursor-pointer underline ml-1" onClick={() => setOpenModalTwo(true)}>Terms of Service</span>.
                            </p>
                            <Modal show={openModalOne} onClose={() => setOpenModalOne(false)}>
                                <Modal.Header>Privacy Policy</Modal.Header>
                                <Modal.Body>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        At <strong>Cook For Me</strong> , we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        We collect personal data such as your name, email address, and contact details when you use our services. This data is used to provide and improve our platform.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        We do not share your personal information with third parties, except as required by law or to improve our services with trusted partners.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        You have the right to access, update, or delete your personal data. If you wish to make any changes, please contact us at <strong>admin@cookforme.com</strong> .
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        By using our services, you agree to this Privacy Policy. We may update this policy from time to time, so please review it periodically.
                                    </p>
                                </div>

                                </Modal.Body>
                                <Modal.Footer>
                                <Button onClick={() => handlePolicy()}>I accept</Button>
                                <Button color="gray" onClick={() => setOpenModalOne(false)}>
                                    Decline
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={openModalTwo} onClose={() => setOpenModalTwo(false)}>
                                <Modal.Header>Terms and Conditions</Modal.Header>
                                <Modal.Body>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        Welcome to Cook For Me! These Terms and Conditions outline the rules and regulations for the use of our services.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        By accessing or using our platform, you agree to comply with these terms. If you disagree with any part of these terms, please do not use our services.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        Our services are intended for users who are at least 18 years old. By using our platform, you confirm that you meet this requirement.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        We reserve the right to modify or update these terms at any time. It is your responsibility to review this page periodically for changes.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        If you have any questions about these Terms and Conditions, please contact us at admin@cookforme.com .
                                    </p>
                                </div>

                                </Modal.Body>
                                <Modal.Footer>
                                <Button onClick={() => handleTerms()}>I accept</Button>
                                <Button color="gray" onClick={() => setOpenModalTwo(false)}>
                                    Decline
                                </Button>
                                </Modal.Footer>
                            </Modal>
                            {!(confPolicy && confTerms) &&
                                <p className="text-sm text-red-600 text-center">
                                    Please accept the Terms and Conditions and Privacy Policy to proceed.
                                </p>
                            }
                            
                            <div className="flex justify-between mt-4">
                                <Button onClick={() => setStep(1)} color='gray' className="w-1/2 mr-2 text-gray-700">Back</Button>
                                <Button 
                                    onClick={() => handleSubmit()} 
                                    disabled={!(confPolicy && confTerms)} 
                                    className={`w-1/2 ml-2 ${!(confPolicy && confTerms && houseNum && street && city && zipCode && country) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Submit
                                </Button>
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SignUp;

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Register } from '../../Redux/Actions/AuthActions';
// import { Button } from 'flowbite-react';

// const SignUp = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // State for tabs
//     const [activeTab, setActiveTab] = useState("Authentificate");

//     // Personal info
//     const [name, setName] = useState("");
//     const [age, setAge] = useState(0);

//     // Address
//     const [houseNum, setHouseNum] = useState("");
//     const [street, setStreet] = useState("");
//     const [city, setCity] = useState("");
//     const [zipCode, setZipCode] = useState("");
//     const [country, setCountry] = useState("Tunisie");
    
//     // Authentication
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSignUp = (e) => {
//         e.preventDefault();
//         const address = { houseNum, street, city, zipCode, country };
//         dispatch(Register({ name, age, address, email, password }, navigate));
//     };

//     const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     return (
//         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//             {/* Tabs */}
//             <div className="flex border-b">
//                 {["Authentificate", "Coordonnees", "Address"].map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`py-2 px-4 text-lg font-semibold focus:outline-none ${
//                             activeTab === tab ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500"
//                         }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* Tab Content */}
//             <div className="p-4">
//                 {activeTab === "Authentificate" && (
//                     <form className="space-y-4">
//                         <div>
//                             <label>Email address</label>
//                             <input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type="email"
//                                 placeholder="Enter email"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                             <p className="text-red-700">{!isValidEmail(email) && "Email must be valid !"}</p>
//                         </div>

//                         <div>
//                             <label>Password</label>
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 placeholder="Password"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                         </div>
//                     </form>
//                 )}

//                 {activeTab === "Coordonnees" && (
//                     <form className="space-y-4">
//                         <div>
//                             <label>Name</label>
//                             <input
//                                 onChange={(e) => setName(e.target.value)}
//                                 type="text"
//                                 placeholder="Enter name"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                             <p className="text-red-700">{name.length <= 1 && "Name must be more than one character !"}</p>
//                         </div>

//                         <div>
//                             <label>Age</label>
//                             <input
//                                 onChange={(e) => setAge(e.target.value)}
//                                 type="number"
//                                 placeholder="Enter Age"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                         </div>
//                     </form>
//                 )}

//                 {activeTab === "Address" && (
//                     <form className="space-y-4">
//                         <input
//                             onChange={(e) => setHouseNum(e.target.value)}
//                             type="text"
//                             placeholder="Enter House number"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setStreet(e.target.value)}
//                             type="text"
//                             placeholder="Enter street name"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setCity(e.target.value)}
//                             type="text"
//                             placeholder="Enter city"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setZipCode(e.target.value)}
//                             type="text"
//                             placeholder="Enter Zip code"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />

//                         <label htmlFor="Country">Choose a country:</label>
//                         <select
//                             onChange={(e) => setCountry(e.target.value)}
//                             name="country"
//                             id="Country"
//                             className="w-full px-3 py-2 border rounded-md"
//                         >
//                             <option value="Tunisie">Tunisie</option>
//                             <option value="France">France</option>
//                         </select>

//                         <Button onClick={handleSignUp} className="w-full mt-4" >
//                             Submit
//                         </Button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SignUp;














// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Register } from '../../Redux/Actions/AuthActions';
// import { Button } from 'flowbite-react';

// const SignUp = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [activeTab, setActiveTab] = useState("Authentificate");

//     const [name, setName] = useState("");
//     const [age, setAge] = useState("");

//     const [houseNum, setHouseNum] = useState("");
//     const [street, setStreet] = useState("");
//     const [city, setCity] = useState("");
//     const [zipCode, setZipCode] = useState("");
//     const [country, setCountry] = useState("Tunisie");

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSignUp = (e) => {
//         e.preventDefault();
//         const address = { houseNum, street, city, zipCode, country };
//         dispatch(Register({ name, age, address, email, password }, navigate));
//     };

//     useEffect(() => {
//         if (password.length >= 6) {
//             const timer = setTimeout(() => setActiveTab("Coordonnees"), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [password]);

//     useEffect(() => {
//         if (age > 0) {
//             const timer = setTimeout(() => setActiveTab("Address"), 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [age]);

//     const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     return (
//         <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//             <div className="flex border-b">
//                 {["Authentificate", "Coordonnees", "Address"].map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         className={`py-2 px-4 text-lg font-semibold focus:outline-none ${
//                             activeTab === tab ? "border-b-2 border-teal-500 text-teal-600" : "text-gray-500"
//                         }`}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             <div className="p-4">
//                 {activeTab === "Authentificate" && (
//                     <form className="space-y-4">
//                         <div>
//                             <label>Email address</label>
//                             <input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type="email"
//                                 placeholder="Enter email"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                             <p className="text-red-700">{!isValidEmail(email) && "Email must be valid !"}</p>
//                         </div>

//                         <div>
//                             <label>Password</label>
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 placeholder="Password"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                         </div>

//                         <p className="text-center mt-4">
//                             Already have an account?{" "}
//                             <span
//                                 onClick={() => navigate("/SignIn")}
//                                 className="text-teal-600 cursor-pointer hover:underline"
//                             >
//                                 Click here
//                             </span>
//                         </p>
//                     </form>
//                 )}

//                 {activeTab === "Coordonnees" && (
//                     <form className="space-y-4">
//                         <div>
//                             <label>Name</label>
//                             <input
//                                 onChange={(e) => setName(e.target.value)}
//                                 type="text"
//                                 placeholder="Enter name"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                             <p className="text-red-700">{name.length <= 1 && "Name must be more than one character !"}</p>
//                         </div>

//                         <div>
//                             <label>Age</label>
//                             <input
//                                 onChange={(e) => setAge(e.target.value)}
//                                 type="number"
//                                 placeholder="Enter Age"
//                                 className="w-full px-3 py-2 border rounded-md"
//                             />
//                         </div>

//                         <p className="text-center mt-4">
//                             Already have an account?{" "}
//                             <span
//                                 onClick={() => navigate("/SignIn")}
//                                 className="text-teal-600 cursor-pointer hover:underline"
//                             >
//                                 Click here
//                             </span>
//                         </p>
//                     </form>
//                 )}

//                 {activeTab === "Address" && (
//                     <form className="space-y-4">
//                         <input
//                             onChange={(e) => setHouseNum(e.target.value)}
//                             type="text"
//                             placeholder="Enter House number"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setStreet(e.target.value)}
//                             type="text"
//                             placeholder="Enter street name"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setCity(e.target.value)}
//                             type="text"
//                             placeholder="Enter city"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />
//                         <input
//                             onChange={(e) => setZipCode(e.target.value)}
//                             type="text"
//                             placeholder="Enter Zip code"
//                             className="w-full px-3 py-2 border rounded-md"
//                         />

//                         <label htmlFor="Country">Choose a country:</label>
//                         <select
//                             onChange={(e) => setCountry(e.target.value)}
//                             name="country"
//                             id="Country"
//                             className="w-full px-3 py-2 border rounded-md"
//                         >
//                             <option value="Tunisie">Tunisie</option>
//                             <option value="Algerie">Algerie</option>
//                             <option value="France">France</option>
//                             <option value="Germany">Germany</option>
//                         </select>

//                         <Button onClick={handleSignUp} className="w-full mt-4">
//                             Submit
//                         </Button>

//                         <p className="text-center mt-4">
//                             Already have an account?{" "}
//                             <span
//                                 onClick={() => navigate("/SignIn")}
//                                 className="text-teal-600 cursor-pointer hover:underline"
//                             >
//                                 Click here
//                             </span>
//                         </p>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SignUp;
