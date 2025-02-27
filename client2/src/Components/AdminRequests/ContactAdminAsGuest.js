import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
import { AddAdminReq } from "../../Redux/Actions/AdminReqActions";

const ContactAdminAsGuest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSendReq = async (e) => {
        e.preventDefault();
        await dispatch(AddAdminReq({ email, message }, navigate));
    };

    return (
        <div className="flex items-center justify-center bg-gray-100" style={{height : "87vh"}}>
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

            <p className="text-center mt-4">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/ContactAdmin")}
                    className="text-teal-600 cursor-pointer hover:underline"
                >
                    Click here
                </span>
            </p>
        </form>
        </div>
    );
};

export default ContactAdminAsGuest;
