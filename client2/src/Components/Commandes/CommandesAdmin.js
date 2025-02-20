import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes, updateCommande } from "../../Redux/Actions/CommandeActions";
import { current } from "../../Redux/Actions/AuthActions";
import { Button, Table } from "flowbite-react";
import TableRowCommandeAdmin  from './CardCommandeAdmin'
const CommandesAdmin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(current());
        dispatch(getAllCommandes());
    }, []);

    const allComm = useSelector(state => state.CommandeReducer.allComm);
    const user = useSelector(state => state.AuthReducer.user);

    const handleDelivery = (commandeId) => {
        dispatch(updateCommande(commandeId, { delivered: true }));
    };

    return (
        <>
            {user.role === "admin" && (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Créé le</Table.HeadCell>
                            <Table.HeadCell>Mis à jour le</Table.HeadCell>
                            <Table.HeadCell>Email Chef</Table.HeadCell>
                            <Table.HeadCell>Email Client</Table.HeadCell>
                            <Table.HeadCell>Statut</Table.HeadCell>
                            <Table.HeadCell>Livré</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {allComm.map((commande) => (
                                <TableRowCommandeAdmin key={commande._id} commande={commande} />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )}
        </>
    );
};

export default CommandesAdmin;
