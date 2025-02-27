import { useState } from "react";
import { Button, Table, Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { updateUserRate } from "../../Redux/Actions/AuthActions";
import { deleteCommande, getCommandesWithClientID, updateCommande } from "../../Redux/Actions/CommandeActions";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { MessageSquareText, Trash2 } from "lucide-react";
const TableRowCommandeAsClient = ({ commande }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [rateChef, setRateChef] = useState(0);
    const [rateLivreur, setRateLivreur] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [feedBack, setFeedBack] = useState("")

    const rateCommande = (rateChef + rateLivreur) / 2

    const handleRate = async (e) => {
        e.preventDefault();
        if (rateCommande > 0) {
            await dispatch(updateUserRate(commande.chef._id, rateChef));
            await dispatch(updateUserRate(commande.livreur._id, rateLivreur));
            await dispatch(updateCommande(commande._id, { rating: rateCommande , feedBack}));
            commande.rating = rateCommande; // Manually update rating to reflect change
        }
        setOpenModal(false);
    };

    const handleRowClick = () => {
        navigate(`/CommandeDetails/${commande._id}`);  // ✅ Redirect to details page
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteCommande(commande._id))
        dispatch(getCommandesWithClientID())
    }

    return (
        <Table.Row className="border-b cursor-pointer hover:bg-gray-100">
            <Table.Cell  className="flex items-center gap-2">
                {commande.status === "In progress" && (
                    <Trash2 className="text-red-700 cursor-pointer" onClick={(e) => {  handleDelete(e); }} style={{marginRight : "5px"}}/>
                )}
                
                <span onClick={handleRowClick}>
                {commande._id}
                </span>
            </Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{commande.chef?.email || "Compte supprimé"}</Table.Cell>
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
                    commande.delivered  ? "bg-green-500" : "bg-red-600" 
                }`}>
                    {commande.delivered ? "Oui" : "Non"}
                </span>
            </Table.Cell>
            <Table.Cell>
                <span className={`px-2 py-1 rounded-md text-white ${
                    commande.confirmed  ? "bg-green-500" : "bg-red-600" 
                }`}>
                    {commande.confirmed ? "Oui" : "Non"}
                </span>
            </Table.Cell>
            <Table.Cell>
                {commande.status === "Accepted" && commande.delivered && commande.confirmed? (
                    commande.rating > 0 ? (
                        <Rating name="read-only" value={commande.rating} readOnly />
                    ) : (
                        <>
                            <Button onClick={() => setOpenModal(true)}>Rate Chef</Button>
                            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Rate Your Order</Modal.Header>
                                <Modal.Body>
                                    <div className="space-y-6 text-center">
                                        <h3 className="text-lg font-semibold">Rate the Chef</h3>
                                        <p className="text-sm text-gray-500">How was the meal prepared by the chef?</p>
                                        <Rating
                                            name="chef-rating"
                                            value={rateChef}
                                            onChange={(event, newValue) => setRateChef(newValue)}
                                        />
                                    </div>
                                    
                                    <div className="space-y-6 text-center mt-4">
                                        <h3 className="text-lg font-semibold">Rate the Delivery</h3>
                                        <p className="text-sm text-gray-500">Was the delivery fast and professional?</p>
                                        <Rating
                                            name="livreur-rating"
                                            value={rateLivreur}
                                            onChange={(event, newValue) => setRateLivreur(newValue)}
                                        />
                                    </div>

                                    <div className="space-y-6 text-center mt-4">
                                        <h3 className="text-lg font-semibold">Leave a Feedback</h3>
                                        <p className="text-sm text-gray-500">Tell us about your experience with this order.</p>
                                        <div className="flex items-center space-x-2 border rounded p-2">
                                            <MessageSquareText className="text-gray-400"/>
                                            <input 
                                                type="text" 
                                                onChange={(e) => setFeedBack(e.target.value)}
                                                placeholder="Write your feedback here..." 
                                                className="w-full focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button onClick={handleRate} disabled={(rateChef === 0 && rateLivreur === 0)}>
                                        Submit Rating
                                    </Button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </>
                    )
                ) : (
                    <span className="text-gray-500">N/A</span>
                )}
            </Table.Cell>
        </Table.Row>
    );
};

export default TableRowCommandeAsClient;
