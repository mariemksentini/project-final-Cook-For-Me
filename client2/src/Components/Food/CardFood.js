// // import { useDispatch, useSelector } from 'react-redux';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { deleteOneFood } from '../../Redux/Actions/FoodActions';
// // import { Button } from 'flowbite-react';

// // const CardFood = ({ fooda }) => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const user = useSelector(state => state.AuthReducer.user);

// //   const handleDeleteFood = async (e) => {
// //     e.preventDefault();
// //     await dispatch(deleteOneFood(fooda._id));
// //     navigate('/IndexFoods');
// //   };

// //   const bgColor = fooda.archieved ? "bg-gray-400" : "";


// //   return (
// //     <div  style={{width : "310px", margin : "10px"}}>
// //       <div className={`max-w-xs rounded overflow-hidden ${bgColor} shadow-lg mb-5 `}>
// //         <img className="w-full" src={fooda.image} alt="Food imag" />
// //         <div className={`p-4 ${bgColor}`}>
// //           <h3 className="text-lg font-semibold">{fooda.name}</h3>
// //           <p>
// //             <strong>Owner:</strong> {fooda?.owner?.name} <br />
// //             <strong>Type:</strong> {fooda.type} <br />
// //             <strong>Description:</strong> {fooda.biography}
// //           </p>
// //           <div className="flex gap-3 mt-4">
// //             <Button as={Link} to={`/FoodDetails/${fooda._id}`}>
// //               View Details
// //             </Button>

// //             {user  && 
// //             ((fooda?.owner?._id === user._id || user.role === "admin") && 
// //               (
// //               <Button onClick={(e) => handleDeleteFood(e)} color="failure">
// //                 Delete Food
// //               </Button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CardFood;

// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { deleteOneFood, editOneFood, fetchFoods, getAllFood } from '../../Redux/Actions/FoodActions';
// import { Button, Dropdown } from 'flowbite-react';
// import { MoreVertical } from 'lucide-react';

// const CardFood = ({ fooda , currentPage}) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const archived = fooda.archived
//   const user = useSelector(state => state.AuthReducer.user);

//   const handleDeleteFood = async () => {

//     await dispatch(deleteOneFood(fooda._id));
//     dispatch(fetchFoods(currentPage, archived))
    
//   };

//   const handleArchiveFood = async () => {

//     await dispatch(editOneFood(fooda._id, {archived : true, quantity : 0}));
//     dispatch(fetchFoods(currentPage, archived))
    
//   };

//   const bgColor = fooda.archived ? "bg-gray-700" : "";
//   const textColor = fooda.archived ? "text-white" : "text-gray-600";

//   return (
//     <div 
//       className={`relative max-w-xs rounded overflow-hidden shadow-lg cursor-pointer ${textColor} ${bgColor}`} 
      
//       style={{ width: '310px', margin: '10px' }}
//     >
//       <div className="relative">
//         <img onClick={() => navigate(`/FoodDetails/${fooda._id}`)} className="w-full h-40 object-cover" src={fooda.image} alt="Food" />
//         <div className="absolute top-2 right-2">
//           <Dropdown label={<MoreVertical className="w-5 h-5 text-gray-700" />} inline>
//             <Dropdown.Item as={Link} to={`/FoodDetails/${fooda._id}`}>View Details</Dropdown.Item>
//             {user && (fooda?.owner?._id === user._id || user.role === "admin") && (
//               <Dropdown.Item onClick={() => handleDeleteFood()} className="text-red-600">Delete Food</Dropdown.Item>
//             )}
//             {user && (fooda?.owner?._id === user._id || user.role === "admin") && (
//               <Dropdown.Item onClick={() => handleArchiveFood()} className="text-slate-600">Archive Food</Dropdown.Item>
//             )}
//           </Dropdown>
//         </div>
//       </div>
//       <div className={`p-4 ${bgColor}`}> 
//         <h3 className="text-lg font-semibold">{fooda.name}</h3>
//         <p className={`text-sm ${textColor} ` } >
//           <strong>Owner:</strong> {fooda?.owner?.name} <br />
//           <strong>Type:</strong> {fooda.type} <br />
//           <strong>Description:</strong> {fooda.biography}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CardFood;

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOneFood, editOneFood, fetchFoods } from '../../Redux/Actions/FoodActions';
import { Dropdown } from 'flowbite-react';
import { EllipsisVertical, MoreVertical } from 'lucide-react';
import { useEffect } from 'react';
import { current } from '../../Redux/Actions/AuthActions';

const CardFood = ({ fooda, currentPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const archived = fooda.archived;
  const user = useSelector(state => state.AuthReducer.user);

  const handleDeleteFood = async () => {
    await dispatch(deleteOneFood(fooda._id));
    dispatch(fetchFoods(currentPage, archived));
  };

  const handleArchiveFood = async () => {
    await dispatch(editOneFood(fooda._id, { archived: true, quantity: 0 }));
    dispatch(fetchFoods(currentPage, archived));
  };

  const token = localStorage.getItem('token')
  useEffect(()=>{
    token && dispatch(current())
  }, [])

  const handleNavigate =()=>{
    token ?
    (user._id === fooda.owner._id ? 
    navigate('/Profil')
    :
    navigate(`/UserDetails/${fooda.owner._id}`))
    : 
    navigate('/SignIn')
  }
  

  const bgColor = archived ? "bg-gray-200" : "bg-white";

  return (
    <div
      className={`relative max-w-xs rounded overflow-hidden shadow-lg cursor-pointer ${bgColor}`}
      style={{ width: "310px", margin: "10px" }}
    >
      <div className="p-4">
        {/* Owner Info */}
        <div className="flex items-center mb-4">
          <img
            src={fooda?.owner?.image || "/user-placeholder.png"}
            alt="Owner"
            className="w-10 h-10 rounded-full object-cover mr-2"
            onClick={()=> handleNavigate()}
          />
          <p className="text-sm font-medium text-gray-700">{fooda?.owner?.name} {fooda?.owner?.lastName}</p>
        </div>

        {/* Food Image */}
        <div onClick={() => navigate( `/FoodDetails/${fooda._id}`)} className="w-full flex justify-center">
          <img
            src={fooda.image || "/food.jpg"}
            alt="Food"
            className="object-cover"
            style={{ width: "250px", height: "180px", borderRadius: "10px" }}
          />
        </div>

        {/* Food Info */}
        <div className="text-center mt-4">
          <h3 className="text-lg font-bold text-gray-900">{fooda.name}</h3>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p><strong>Quantity:</strong> {fooda.quantity}</p>
          <p><strong>Price:</strong> ${fooda.price}</p>
        </div>

        {/* Action Icons */}
        <div className="absolute  " style={{    top: "25px",    right: "15px"}}>
          <Dropdown arrowIcon={false} label={<EllipsisVertical className="w-5 h-5 text-gray-700" />} inline>
            <Dropdown.Item as={Link} to={`/FoodDetails/${fooda._id}`}>View Details</Dropdown.Item>
            {user && (fooda?.owner?._id === user._id || user.role === "admin") && (
              <Dropdown.Item onClick={handleDeleteFood} className="text-red-600">Delete Food</Dropdown.Item>
            )}
            {user && (fooda?.owner?._id === user._id || user.role === "admin") && (
              <Dropdown.Item onClick={handleArchiveFood} className="text-slate-600">Archive Food</Dropdown.Item>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CardFood;
