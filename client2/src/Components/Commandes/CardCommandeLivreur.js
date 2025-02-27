import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommande, getAllCommandes, updateCommande } from "../../Redux/Actions/CommandeActions";
import { Button, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { current, getOneUser, updateFromAdmin } from "../../Redux/Actions/AuthActions";

const TableRowCommandeLivreur = ({ commande }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [delivered, setDelivered] = useState(commande.delivered);
    const [taken, setTaken] = useState(commande?.livreur)
    const user = useSelector((state)=> state.AuthReducer.user)
    useEffect(()=>{
        dispatch(current())
    }, [])
    const handleDelivery = async () => {
        try {
            await dispatch(updateCommande(commande._id, { delivered: true }));
            setDelivered(true);
        } catch (error) {
            console.error("Error updating delivery status:", error);
        }
    };

    const handleTakeIt = async()=>{
        try {
            await dispatch(updateCommande(commande._id, { livreur : user._id  }));
            setTaken(true)
        } catch (error) {
            console.error("Error updating delivery status:", error);
        }
    }
    
    const handleRowClick = () => {
        navigate(`/CommandeDetails/${commande._id}`);  // ✅ Redirect to details page
    };

 

    return (
        <Table.Row className="border-b cursor-pointer hover:bg-gray-100" >
            <Table.Cell className="flex items-center gap-2">
                
                <span onClick={handleRowClick}>
                {commande._id}
                </span>
                
            </Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{commande.chef?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.client?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.livreur?.email || "No livreur assigned yet."}</Table.Cell>
            <Table.Cell>
                <span className={`px-2 py-1 rounded-md text-white ${
                    commande.status === "Accepted" ? "bg-green-500" :
                    commande.status === "Rejected" ? "bg-red-600" :
                    "bg-gray-500"
                }`}>
                    {commande.status}
                </span>
            </Table.Cell>
            <Table.Cell>
                <span className={`px-2 py-1 rounded-md text-white ${
                    delivered  ? "bg-green-500" : "bg-red-600" 
                }`}>
                    {delivered ? "Oui" : "Non"}
                </span>
            </Table.Cell>
            <Table.Cell>
                <span className={`px-2 py-1 rounded-md text-white ${
                    commande.confirmed  ? "bg-green-500" : "bg-red-600" 
                }`}>
                    {commande.confirmed ? "Oui" : "Non"}
                </span>
            </Table.Cell>
            <Table.Cell>
                {commande?.status === "Accepted" && !commande?.delivered ? (
                    commande?.livreur?._id === user?._id ? (
                        <Button size="xs" color="success" onClick={handleDelivery}>
                            Delivered
                        </Button>
                    ) : !taken ? (
                        <Button size="xs" color="success" onClick={handleTakeIt}>
                            Take It
                        </Button>
                    ) : (
                        <span className="text-gray-500">N/A</span>
                    )
                ) : (
                    <span className="text-gray-500">N/A</span>
                )}
            </Table.Cell>

        </Table.Row>
    );
};

export default TableRowCommandeLivreur;
