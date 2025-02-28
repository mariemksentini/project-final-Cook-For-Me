import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes } from "../../Redux/Actions/CommandeActions";
import { current } from "../../Redux/Actions/AuthActions";
import { Table, Spinner } from "flowbite-react";
import { PackageX } from "lucide-react"; // Lucide icon
import TableRowCommandeLivreur from "./CardCommandeLivreur";
import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";

const CommandesAsLivreur = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (token) dispatch(current());
        dispatch(getAllCommandes()).then(() => setLoading(false)); // Stop loading after fetching
    }, []);

    const allComm = useSelector(state => state.CommandeReducer.allComm);
    const user = useSelector(state => state.AuthReducer.user);

    return (
        <>
            {loading ? (
                // 🔄 Spinner when loading
                <div className="flex justify-center items-center h-40">
                    <SpinnerDeepSeek />
                </div>
            ) : allComm.length !== 0 ? (
                user.role === "livreur" && (
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>ID</Table.HeadCell>
                                <Table.HeadCell>Créé le</Table.HeadCell>
                                <Table.HeadCell>Mis à jour le</Table.HeadCell>
                                <Table.HeadCell>Email Chef</Table.HeadCell>
                                <Table.HeadCell>Email Client</Table.HeadCell>
                                <Table.HeadCell>Email Livreur</Table.HeadCell>
                                <Table.HeadCell>Statut</Table.HeadCell>
                                <Table.HeadCell>Livré</Table.HeadCell>
                                <Table.HeadCell>Confirmée</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {allComm.map((commande) => (
                                    <TableRowCommandeLivreur key={commande._id} commande={commande} />
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )
            ) : (
                // 📦 No commands UI
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                    <PackageX size={50} className="mb-2" />
                    <p>Aucune commande disponible.</p>
                </div>
            )}
        </>
    );
};

export default CommandesAsLivreur;
