import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommande } from "../../Redux/Actions/CommandeActions";
import { Button, Table } from "flowbite-react";

const TableRowCommandeAdmin = ({ commande }) => {
    const dispatch = useDispatch();
    const [delivered, setDelivered] = useState(commande.delivered);

    const handleDelivery = async () => {
        try {
            await dispatch(updateCommande(commande._id, { delivered: true }));
            setDelivered(true);
        } catch (error) {
            console.error("Error updating delivery status:", error);
        }
    };

    return (
        <Table.Row className="border-b">
            <Table.Cell>{commande._id}</Table.Cell>
            <Table.Cell>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{commande.chef?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.client?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>
                <span className={`px-2 py-1 rounded-md text-white ${
                    commande.status === "Accepted" ? "bg-green-500" :
                    commande.status === "Rejected" ? "bg-red-500" :
                    "bg-gray-500"
                }`}>
                    {commande.status}
                </span>
            </Table.Cell>
            <Table.Cell>{delivered ? "Oui" : "Non"}</Table.Cell>
            <Table.Cell>
                {commande.status === "Accepted" && !delivered && (
                    <Button size="xs" color="success" onClick={handleDelivery}>
                        Confirmer livraison
                    </Button>
                )}
            </Table.Cell>
        </Table.Row>
    );
};

export default TableRowCommandeAdmin;
