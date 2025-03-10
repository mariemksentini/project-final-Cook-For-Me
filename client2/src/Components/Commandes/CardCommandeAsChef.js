// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateCommandeStatus } from '../../Redux/Actions/CommandeActions';
// import { Button } from 'flowbite-react';
// import { editOneFood } from '../../Redux/Actions/FoodActions';

// const CardCommandeAsChef = ({ commande }) => {
//     const dispatch = useDispatch();
//     const [status, setStatus] = useState(commande.status);

//     // Determine card color based on status
//     const getCardColor = () => {
//         switch (status) {
//             case "Accepted":
//                 return "bg-green-500";
//             case "Rejected":
//                 return "bg-red-600";
//             default:
//                 return "bg-gray-100";
//         }
//     };
//     const getTextColor = () => {
//         switch (status) {
//             case "Accepted":
//                 return "text-white"; // White contrasts well with green
//             case "Rejected":
//                 return "text-white"; // White stands out on red
//             default:
//                 return "text-black"; // Black works best on light gray
//         }
//     };

//     const handleStatusUpdate = async (e, newStatus) => {
//         e.preventDefault();
//         try {
//             // Mettre à jour le statut de la commande
//             await dispatch(updateCommandeStatus(commande._id, newStatus));
//             setStatus(newStatus);
    
//             if (newStatus === "Accepted") {
//                 // Mettre à jour la quantité de chaque produit
//                 commande.products.forEach(async (el) => {
//                     const updatedQuantity = el.product.quantity - el.qte;
//                     if (updatedQuantity >= 0) {
//                         await dispatch(editOneFood(el.product._id, { quantity: updatedQuantity }));
//                         if (updatedQuantity === 0) {
//                             await dispatch(editOneFood(el.product._id, { archieved: true }));
//                         }
//                     }
//                 });
//             }
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     return (
//         <div className={`max-w-sm rounded overflow-hidden shadow-lg ${getCardColor()} ${getTextColor()} mb-5`}>
//             <div className="p-4">
//                 <h3 className="text-lg font-semibold">Commande Details</h3> <br/>
//                 <p><strong>Status:</strong> {status}</p> <br/>
//                 {commande.client.archived 
//                     ?   <h1 className="text-xl font-semibold">Account Deleted</h1>
//                     :   
//                     <>
//                         <p><strong>Client ID:</strong> {commande.client._id}</p> <br/>
//                         <p><strong>Client name:</strong> {commande.client.name}</p> <br/>
//                     </>
//                 }
//                 <p><strong>Client email:</strong> {commande.client.email}</p> <br/>
//                 <p><strong>Created At:</strong> {new Date(commande.createdAt).toLocaleString()}</p> <br/>
//                 <p><strong>Updated At:</strong> {new Date(commande.updatedAt).toLocaleString()}</p> <br/>
//                 <hr className="my-3" />
//                 <h3 className="text-lg font-semibold">Products</h3> <br/>
//                 {commande.products.map((el, index) => (
//                     <div key={el._id} className="mb-2">
//                         <p><strong>Product {index + 1}:</strong> {el.product.name}</p> <br/>
//                         <p><strong>Quantity:</strong> {el.qte}</p> <br/>
//                         <p><strong>Type:</strong> {el.product.type}</p> <br/>
//                         <hr className="my-2" />
//                     </div>
//                 ))}
//                 {
//                     !commande.client.archived && 
//                     status === "In progress" && (
//                         <div className="flex gap-3 mt-4">
//                             <Button onClick={(e) => handleStatusUpdate(e, "Accepted")} color="success">
//                                 Accept Order
//                             </Button>
//                             <Button onClick={(e) => handleStatusUpdate(e, "Rejected")} color="failure">
//                                 Reject Order
//                             </Button>
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     );
// };

// export default CardCommandeAsChef;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommandeStatus } from "../../Redux/Actions/CommandeActions";
import { Button, Table } from "flowbite-react";
import { editOneFood } from "../../Redux/Actions/FoodActions";
import { useNavigate } from "react-router-dom";
import { current } from "../../Redux/Actions/AuthActions";

const TableRowCommandeAsChef = ({ commande }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [status, setStatus] = useState(commande.status);
    useEffect(()=>{
        if (token) dispatch(current())
    }, [])
    const handleStatusUpdate = async (e, newStatus) => {
        e.preventDefault();
        try {
            // Mettre à jour le statut de la commande
            await dispatch(updateCommandeStatus(commande._id, newStatus));
            await setStatus(newStatus);
    
            if (newStatus === "Accepted") {
                
                for (const el of commande.products) {  // ✅ Changer forEach en for...of
                    console.log("Produit:", el.product.name, "Quantité avant:", el?.product?.quantity, "Quantité commandée:", el.qte);

                    const updatedQuantity = el.product.quantity - el.qte;
                    if (updatedQuantity >= 0) {
                        await dispatch(editOneFood(el.product._id, { quantity: updatedQuantity }));
                        if (updatedQuantity === 0) {
                            await dispatch(editOneFood(el.product._id, { archived: true }));
                        }
                    }
                }
            }
            
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleRowClick = () => {
        navigate(`/CommandeDetails/${commande._id}`);  // ✅ Redirect to details page
    };

    return (
        <Table.Row className="border-b cursor-pointer hover:bg-gray-100" >
            <Table.Cell onClick={handleRowClick}>{commande._id}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>{new Date(commande.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell >{commande.client?.email || "Compte supprimé"}</Table.Cell>
            <Table.Cell>{commande.livreur?.email || "No livreur assigned yet"}</Table.Cell>
            <Table.Cell onClick={handleRowClick}>
                <span className={`px-2 py-1 rounded-md text-white ${
                    status === "Accepted" ? "bg-green-500" :
                    status === "Rejected" ? "bg-red-600" :
                    "bg-gray-500"
                }`}>
                    {status}
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
                {status === "In_progress" ? (
                    <div className="flex gap-2">
                        <Button size="xs" color="success" onClick={(e) => handleStatusUpdate(e, "Accepted")}>
                            Accept
                        </Button>
                        <Button size="xs" color="failure" onClick={(e) => handleStatusUpdate(e, "Rejected")}>
                            Reject
                        </Button>
                    </div>
                )
                :
                <span className="text-gray-500">N/A</span>
            }
            </Table.Cell>
            
        </Table.Row>
    );
};

export default TableRowCommandeAsChef;

