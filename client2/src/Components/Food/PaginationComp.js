// // PaginationComponent.js
// import { Pagination } from "flowbite-react";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from 'flowbite-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFoods } from '../../Redux/Actions/FoodActions';

// const PaginationComponent = () => {
//     const dispatch = useDispatch()
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [foods, setFoods] = useState([]);


// //   const fetchFoods = async (page) => {
// //     try {
// //       const response = await axios.get(`/api/food/GetFoodet?page=${page}&pageSize=2`);
// //       const { foods, totalPages } = response.data;
// //       setFoods(foods);
// //       setTotalPages(totalPages);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
//     useEffect(()=>{
//         dispatch(fetchFoods(currentPage))
        
//     }, [currentPage])
//     const foodsFromStore = useSelector((state) => state.FoodReducer.foodet);
//     const totalPagesFromStore = useSelector((state) => state.FoodReducer.totalPages);

//     useEffect(() => {
//     setFoods(foodsFromStore);
//     setTotalPages(totalPagesFromStore);
//     }, [foodsFromStore, totalPagesFromStore]);


// //   useEffect(() => {
// //     fetchFoods(currentPage);
// //   }, [currentPage]);

// //   const handlePrevPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage- 1);
// //     }
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

    

//   const onPageChange = (page) => setCurrentPage(page);

//   return (
//     <div>
//       {/* Display the foods */}
//       {foods.map((fooda) => (
//         <div key={fooda._id}>{fooda.name}</div>
//       ))}

//       {/* Pagination controls */}
//       {/* <Button onClick={handlePrevPage} disabled={currentPage === 1}>
//         Previous Page
//       </Button>
//       <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
//         Next Page
//       </Button> */}
//       <div className="flex overflow-x-auto sm:justify-center">
//       <Pagination currentPage={currentPage} totalPages={totalPagesFromStore} onPageChange={onPageChange} showIcons />
//     </div>
//     </div>
//   );
// };

// export default PaginationComponent;