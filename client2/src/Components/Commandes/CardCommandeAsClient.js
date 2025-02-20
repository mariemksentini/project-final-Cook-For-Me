import { useState } from "react";
import { Button, Table, Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { updateUserRate } from "../../Redux/Actions/AuthActions";
import Rating from '@mui/material/Rating';
const TableRowCommandeAsClient = ({ commande }) => {
    const dispatch = useDispatch()
    const [rate, setRate] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleRate = async(e,id) => {
        e.preventDefault()
        setOpenModal(false);
        console.log(rate)
        rate > 0 && dispatch(updateUserRate(id,rate));
    };

    return (
        <Table.Row className="border-b">
            <Table.Cell>{commande._id}</Table.Cell>
            <Table.Cell>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{commande.chef?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande?.status}</Table.Cell>
            <Table.Cell>{commande?.delivered ? "Yes" : "No"}</Table.Cell>
            <Table.Cell>
                {commande.status === "Accepted" && commande.delivered && (
                    <>
                    <Button onClick={() => setOpenModal(true)}>Rate Chef</Button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Rate Chef</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                            <Rating
                                name="simple-controlled"
                                value={rate}
                                onChange={(event, newValue) => {
                                setRate(newValue);
                                }}
                            />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={(e) => handleRate(e, commande?.chef?._id)}>
                                Submit Rating
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                )}
            </Table.Cell>
            
        </Table.Row>
    );
};

export default TableRowCommandeAsClient;
