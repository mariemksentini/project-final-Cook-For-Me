import { Button } from 'flowbite-react'; // Import Flowbite Button
import { Card } from 'flowbite-react'; // Import Flowbite Card
import { Link } from 'react-router-dom';

const CardPanier = ({ panier }) => {
    return (
        <Card className="w-72">
            <img
                src="holder.js/100px180"
                alt="Product mage"
                className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
                <h5 className="text-lg font-semibold">
                    client: {panier?.client?.name}
                </h5>
                <p className="text-sm text-gray-500">
                    son email: {panier?.client?.email} <br />
                    created at: {new Date(panier?.createdAt).toLocaleString()} <br />
                    updated at: {new Date(panier?.updatedAt).toLocaleString()} <br />
                    number of products: {panier?.products.length}
                </p>
                <Link to={`/PanierDetails/${panier.client._id}`}>
                    <Button >
                        View details
                        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default CardPanier;
