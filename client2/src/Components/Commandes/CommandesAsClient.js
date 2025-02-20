import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCommandesWithClientID } from "../../Redux/Actions/CommandeActions";
import { Button, Table, Modal } from "flowbite-react";
import TableRowCommandeAsClient from './CardCommandeAsClient'; // Assuming TableRowCommandeAsClient is in the same folder

const CommandesAsClient = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommandesWithClientID());
    }, []);

    const commandesAsClient = useSelector(state => state.CommandeReducer.commandesAsClient);

    

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Créé le</Table.HeadCell>
                    <Table.HeadCell>Mis à jour le</Table.HeadCell>
                    <Table.HeadCell>Email Chef</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                    <Table.HeadCell>Livré</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {commandesAsClient.map((commande) => (
                        <TableRowCommandeAsClient key={commande._id} commande={commande}  />
                    ))}
                </Table.Body>
            </Table>

            
        </div>
    );
};

export default CommandesAsClient;
