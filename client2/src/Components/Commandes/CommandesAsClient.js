import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommandesWithClientID } from "../../Redux/Actions/CommandeActions";
import { Table, Spinner } from "flowbite-react";
import { PackageSearch } from "lucide-react";
import TableRowCommandeAsClient from "./CardCommandeAsClient";

const CommandesAsClient = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            dispatch(getCommandesWithClientID()).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const commandesAsClient = useSelector(state => state.CommandeReducer.commandesAsClient);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Spinner size="xl" />
                </div>
            ) : commandesAsClient?.length ? (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Créé le</Table.HeadCell>
                            <Table.HeadCell>Mis à jour le</Table.HeadCell>
                            <Table.HeadCell>Email Chef</Table.HeadCell>
                            <Table.HeadCell>Email Livreur</Table.HeadCell>
                            <Table.HeadCell>Statut</Table.HeadCell>
                            <Table.HeadCell>Delivered</Table.HeadCell>
                            <Table.HeadCell>Confirmed</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {commandesAsClient.map((commande) => (
                                <TableRowCommandeAsClient key={commande._id} commande={commande} />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                    <PackageSearch size={50} className="mb-2" />
                    <p>Aucune commande trouvée.</p>
                </div>
            )}
        </>
    );
};

export default CommandesAsClient;
