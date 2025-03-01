import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
import { SendRequestToAdmin } from "../../Redux/Actions/AdminReqActions";

const ContactAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Unarchieve Account");
    const [message, setMessage] = useState("");

    const handleSendReq = async (e) => {
        e.preventDefault();
        await dispatch(SendRequestToAdmin({ email, password, type, message }, navigate));
    };

    return (
        <div className="flex items-center justify-center " style={{height : "87vh"}}>
        <form onSubmit={handleSendReq} className="space-y-4 p-6 mx-auto bg-white shadow-md rounded-lg" style={{width: "500px"}}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Request Type</label>
                <select
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="Unarchieve Account">Unarchieve Account</option>
                    <option value="Ban s.o">Ban s.o</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows="4"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            

            <Button type="submit" className="w-full">
                Send Request
            </Button>

            <p className="text-center mt-4 text-gray-700">
                Contact us as a guest?{" "}
                <span
                    onClick={() => navigate("/ContactAdminAsGuest")}
                    className="text-teal-600 cursor-pointer hover:underline"
                >
                    Click here
                </span>
            </p>
        </form>
        </div>
    );
};

export default ContactAdmin;
