import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { ArrowRight, BarChart2, DollarSign } from "lucide-react"; // Import Lucide icons
import { current } from "../../Redux/Actions/AuthActions";
import { GetAllRequests } from "../../Redux/Actions/AdminReqActions";
import LineChart from "../ChartComp";
import CardRequest from "../AdminRequests/CardRequest";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(current());
      dispatch(GetAllRequests());
    }
  }, [dispatch]);

  const user = useSelector((state) => state.AuthReducer.user);
  const allRequests = useSelector((state) => state.AdminReqReducer.allReqs);

  const totalEarnings = user?.earnings?.reduce((acc, cur) => acc + cur, 0) || 0;
  const latestRequests = allRequests.slice(0, 4);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-teal-800">Admin Dashboard</h1>
        {/* <div className="flex items-center space-x-4">
          <Button color="light" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="light" onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </div> */}
      </div>

      {/* Recent Requests Section */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5" /> Recent Requests
          </h2>
          <Button color="light" onClick={() => navigate("/ListRequests")}>
            View All Requests
          </Button>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          {latestRequests.map((request) => (
            <CardRequest request={request} key={request._id} />
          ))}
        </div>
      </Card>

      {/* Earnings Chart Section */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" /> Earnings Chart
          </h2>
        </div>
        <LineChart earnings={user?.earnings || []} type={"Sales"} />
      </Card>

      {/* Total Earnings Section */}
      <Card>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Total Earnings
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {totalEarnings.toFixed(2)} DT
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardAdmin;