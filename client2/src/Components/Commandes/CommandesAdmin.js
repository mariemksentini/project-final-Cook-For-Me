import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes } from "../../Redux/Actions/CommandeActions";
import { current } from "../../Redux/Actions/AuthActions";
import { Table, Spinner } from "flowbite-react";
import { ClipboardX } from "lucide-react";
import TableRowCommandeAdmin from "./CardCommandeAdmin";
import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";
import SpinnerChatGpt from "../SpinnerDeepSeek/SpinnerChatGpt";

const CommandesAdmin = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) dispatch(current());
        dispatch(getAllCommandes()).then(() => setLoading(false));
    }, []);

    const allComm = useSelector(state => state.CommandeReducer.allComm);
    const user = useSelector(state => state.AuthReducer.user);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <SpinnerDeepSeek />
                </div>
            ) : allComm.length !== 0 ? (
                user.role === "admin" && (
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
                                    <TableRowCommandeAdmin key={commande._id} commande={commande} />
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-600">
                    <ClipboardX size={50} className="mb-2" />
                    <p>Aucune commande disponible.</p>
                </div>
            )}
        </>
    );
};

export default CommandesAdmin;
