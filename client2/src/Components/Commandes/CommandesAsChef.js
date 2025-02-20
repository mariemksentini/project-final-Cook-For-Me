import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommandesWithChefID } from "../../Redux/Actions/CommandeActions";
import { Button, Table } from "flowbite-react";
import TableRowCommandeAsChef from "./CardCommandeAsChef";

const CommandesAsChef = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getCommandesWithChefID());
    }, []);

    const commandesAsChef = useSelector(state => state.CommandeReducer.commandesAsChef);

    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Créé le</Table.HeadCell>
                    <Table.HeadCell>Mis à jour le</Table.HeadCell>
                    <Table.HeadCell>Email Client</Table.HeadCell>
                    <Table.HeadCell>Statut</Table.HeadCell>
                    <Table.HeadCell>Delivered</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                {/* <Table.Body>
                    {commandesAsChef.map((commande) => (
                        <Table.Row key={commande._id} className="border-b">
                            <Table.Cell>{commande._id}</Table.Cell>
                            <Table.Cell>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
                            <Table.Cell>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
                            <Table.Cell>{commande.client?.email || "Compte supprimé"}</Table.Cell>
                            <Table.Cell>
                                
                            </Table.Cell>
                            <Table.Cell>{commande?.delivered ? "Yes" : "No"}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body> */}
                <Table.Body>
                    {commandesAsChef.map((commande) => (
                        <TableRowCommandeAsChef key={commande._id} commande={commande} />
                    ))}
                </Table.Body>

            </Table>
        </div>
    );
};

export default CommandesAsChef;
