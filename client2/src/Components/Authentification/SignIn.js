import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from '../../Redux/Actions/AuthActions';
import { Button } from 'flowbite-react/components/Button';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(LogIn({ email, password }, navigate));
    };

    return (
        <form className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Enter email" 
                    
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                    onChange={(e) => setPasword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            
            <Button onClick={(e) => handleSignIn(e)} className="w-full" >
                Submit
            </Button>
            
            <Button color="light" className="w-full" as={Link} to='/ContactAdmin'>
                Contact Admin
            </Button>
        </form>
    );
};

export default SignIn;
