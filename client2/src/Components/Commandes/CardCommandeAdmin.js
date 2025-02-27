import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommande, getAllCommandes, updateCommande } from "../../Redux/Actions/CommandeActions";
import { Button, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { current, getOneUser, updateFromAdmin } from "../../Redux/Actions/AuthActions";

const TableRowCommandeAdmin = ({ commande }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [delivered, setDelivered] = useState(commande.delivered);
    const [confirmed, setConfirmed] = useState(commande.confirmed);
    const user = useSelector((state)=> state.AuthReducer.user)
    const handleDelivery = async () => {
        try {
            await dispatch(updateCommande(commande._id, { delivered: true }));
            setDelivered(true);
        } catch (error) {
            console.error("Error updating delivery status:", error);
        }
    };
    const handleConfirm = async () => {
        try {
            await dispatch(updateCommande(commande._id, { confirmed: true }));
            setConfirmed(true);
            const couxChef = Math.ceil((commande.totalPrice  * 0.97) * 100) /100
            const couxAdmin = Math.round((commande.totalPrice * 0.01) * 100) / 100;
            const couxLivreur = Math.round((commande.totalPrice * 0.02) * 100) / 100;

            await dispatch(updateFromAdmin(commande.chef._id, {earnings :[...commande.chef.earnings, couxChef]}))
            await dispatch(updateFromAdmin(commande.livreur._id, {earnings :[...commande.livreur.earnings, couxLivreur]}))
            await dispatch(current())
            dispatch(updateFromAdmin(user._id , {earnings : [...user.earnings, couxAdmin]}))
        } catch (error) {
            console.error("Error updating delivery status:", error);
        }
    };
    const handleRowClick = () => {
        navigate(`/CommandeDetails/${commande._id}`);  // ✅ Redirect to details page
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommande(commande._id))
        dispatch(getAllCommandes())
    }

    return (
        <Table.Row className="border-b cursor-pointer hover:bg-gray-100" >
            <Table.Cell className="flex items-center gap-2">
                
                <Trash2 className="text-red-600 cursor-pointer" onClick={(e) => {  handleDelete(e); }} />
                <span onClick={handleRowClick}>
                {commande._id}
                </span>
                
            </Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{commande.chef?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.client?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.livreur?.email || "No livreur assigned yet"}</Table.Cell>
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
                    confirmed  ? "bg-green-500" : "bg-red-600" 
                }`}>
                    {confirmed ? "Oui" : "Non"}
                </span>
            </Table.Cell>
            <Table.Cell>
                {commande.status === "Accepted" && !commande.delivered && (
                    <Button size="xs" color="success" onClick={handleDelivery}>
                        livraison
                    </Button>
                )}
                {commande.delivered  && !commande.confirmed && (
                    <Button size="xs" color="success" onClick={handleConfirm}>
                        Confirm
                    </Button>
                )}
            </Table.Cell>
        </Table.Row>
    );
};

export default TableRowCommandeAdmin;
