// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { LogIn } from '../../Redux/Actions/AuthActions';
// import { Button } from 'flowbite-react/components/Button';

// const SignIn = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPasword] = useState("");

//     const handleSignIn = (e) => {
//         e.preventDefault();
//         dispatch(LogIn({ email, password }, navigate));
//     };

//     return (
//         <form className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Email address</label>
//                 <input 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     type="email" 
//                     placeholder="Enter email" 
                    
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input 
//                     onChange={(e) => setPasword(e.target.value)} 
//                     type="password" 
//                     placeholder="Password" 
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//                 />
//             </div>
            
//             <Button onClick={(e) => handleSignIn(e)} className="w-full" >
//                 Submit
//             </Button>
            
            
//             <Button color="light" className="w-full" as={Link} to='/ContactAdmin'>
//                 Contact Admin
//             </Button>

//             <p className="text-center mt-4">
//                 Don't have an account?{" "}
//                 <span
//                     onClick={() => navigate("/SignUp")}
//                     className="text-teal-600 cursor-pointer hover:underline"
//                 >
//                     Sign up
//                 </span>
//             </p>
//         </form>
//     );
// };

// export default SignIn;

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogIn } from '../../Redux/Actions/AuthActions';
import { Button } from 'flowbite-react';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(LogIn({ email, password }, navigate));
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

    return (
        <div className="flex items-center justify-center bg-gray-100" style={{height : "87vh"}}>
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex">
                <div className="w-1/2 flex flex-col items-center justify-center p-6 rounded-l-lg">
                    <div className="gif-container">
                        <div 
                            className="tenor-gif-embed" 
                            data-postid="25055362" 
                            data-share-method="host" 
                            data-aspect-ratio="0.965625" 
                            data-width="100%"
                        >
                            <a href="https://tenor.com/fr/view/100-gif-25055362">100 GIF</a> from 
                            <a href="https://tenor.com/search/100-gifs">100 GIFs</a>
                        </div>
                    </div>
                    <p className="mt-4">Don't have an account? 
                        <span onClick={() => navigate('/SignUp')} className="text-teal-600 cursor-pointer underline ml-1">Sign up</span>
                    </p>
                </div>
                <div className="w-1/2 p-6">
                    <div className="space-y-4">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border rounded" 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 border rounded" 
                        />
                        <Button onClick={handleSignIn} className="w-full">Submit</Button>
                        <Button color="light" className="w-full" onClick={() => navigate('/ContactAdmin')}>
                            Contact Admin
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
