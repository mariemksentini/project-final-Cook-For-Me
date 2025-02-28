import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { ArrowRight, BarChart2, DollarSign } from "lucide-react"; // Import Lucide icons
import { current } from "../../Redux/Actions/AuthActions";
import LineChart from "../ChartComp";
import { getCommandesWithLivreurID } from "../../Redux/Actions/CommandeActions";

const DashboardLivreur = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(current());
            dispatch(getCommandesWithLivreurID());
        }
    }, []);

  const user = useSelector((state) => state.AuthReducer.user);

  const totalEarnings = user?.earnings?.reduce((acc, cur) => acc + cur, 0) || 0;
  const commandesAsLivreur = useSelector((state) => state.CommandeReducer.commandesAsLivreur) || [];
  const latestCommandes = commandesAsLivreur.slice(0,3)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-teal-800">{user.email}</h1>
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
            <ArrowRight className="mr-2 h-5 w-5" /> Recent Orders
          </h2>
          <Button color="light" onClick={() => navigate(`/CommandesAsLivreur`)}>
            View All Orders
          </Button>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          {latestCommandes.map((commande, i) => (
            <Card
            key={commande._id}
            className="p-4 bg-white shadow-md rounded-lg mb-4 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/CommandeDetails/${commande._id}`)}
          >
            <p><strong>ID:</strong> {commande._id}</p>
            <p><strong>Client:</strong> {commande.client?.name}</p>
            <p><strong>Chef:</strong> {commande.chef?.name}</p>
            <p><strong>Total:</strong> {commande.totalPrice}dt</p>
            <p><strong>Your share:</strong> {Math.round((commande.totalPrice * 0.03) * 100 * 5) / 100}dt</p>

          </Card>
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

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" /> Rating Chart
          </h2>
        </div>
        <LineChart earnings={user?.rate || []} type={"Rate"} />
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

export default DashboardLivreur;