import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommandesWithChefID } from "../../Redux/Actions/CommandeActions";
import { Table, Spinner } from "flowbite-react";
import { UtensilsCrossed } from "lucide-react";
import TableRowCommandeAsChef from "./CardCommandeAsChef";
import { current } from "../../Redux/Actions/AuthActions";

const CommandesAsChef = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) dispatch(current());
        dispatch(getCommandesWithChefID()).then(() => setLoading(false));
    }, []);

    const commandesAsChef = useSelector(state => state.CommandeReducer.commandesAsChef);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spinner size="xl" />
                </div>
            ) : commandesAsChef?.length ? (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Créé le</Table.HeadCell>
                            <Table.HeadCell>Mis à jour le</Table.HeadCell>
                            <Table.HeadCell>Email Client</Table.HeadCell>
                            <Table.HeadCell>Email Livreur</Table.HeadCell>
                            <Table.HeadCell>Statut</Table.HeadCell>
                            <Table.HeadCell>Delivered</Table.HeadCell>
                            <Table.HeadCell>Confirmed</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {commandesAsChef.map((commande) => (
                                <TableRowCommandeAsChef key={commande._id} commande={commande} />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                    <UtensilsCrossed size={50} className="mb-2" />
                    <p>Aucune commande trouvée.</p>
                </div>
            )}
        </>
    );
};

export default CommandesAsChef;
