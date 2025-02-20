import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOneFood } from '../../Redux/Actions/FoodActions';
import { Button } from 'flowbite-react';

const CardFood = ({ fooda }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.AuthReducer.user);

  const handleDeleteFood = async (e) => {
    e.preventDefault();
    await dispatch(deleteOneFood(fooda._id));
    navigate('/IndexFoods');
  };

  const bgColor = fooda.archieved ? "bg-gray-400" : "";


  return (
    <div >
      <div className={`max-w-xs rounded overflow-hidden ${bgColor} shadow-lg mb-5 `}>
        <img className="w-full" src="holder.js/100px180" alt="Food imag" />
        <div className={`p-4 ${bgColor}`}>
          <h3 className="text-lg font-semibold">{fooda.name}</h3>
          <p>
            <strong>Owner:</strong> {fooda?.owner?.name} <br />
            <strong>Type:</strong> {fooda.type} <br />
            <strong>Description:</strong> {fooda.biography}
          </p>
          <div className="flex gap-3 mt-4">
            <Button as={Link} to={`/FoodDetails/${fooda._id}`}>
              View Details
            </Button>

            {user  && 
            ((fooda?.owner?._id === user._id || user.role === "admin") && 
              (
              <Button onClick={(e) => handleDeleteFood(e)} color="failure">
                Delete Food
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFood;
