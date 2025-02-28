import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { current, fetchUsers, getAllUsers } from "../../Redux/Actions/AuthActions";
import CardUser from "./CardUser";
import { Users, UserCheck, Loader2 } from "lucide-react";
import { Button, Pagination } from "flowbite-react";
import { FaArchive } from "react-icons/fa";
import AnimeSnakeLoading from "../Loading/AnimeSnakeLoading";
import SpinnerDeepSeek from "../SpinnerDeepSeek/SpinnerDeepSeek";

const ListUsers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchived, setShowArchived] = useState(false);

  // const users = useSelector((state) => state.AuthReducer.users);
  

  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers(currentPage, showArchived));
  }, [currentPage, showArchived]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) dispatch(current());
  }, []);

  const useret = useSelector((state)=> state.AuthReducer.useret)
  const totalPages = useSelector((state)=> state.AuthReducer.totalPages)

  const currUser = useSelector((state)=> state.AuthReducer.user)

  const onPageChange = (page) => setCurrentPage(page);
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-500" />
          User List
        </h1>
        <Button
            color="light"
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 hover:bg-gray-200 transition"
        >
            <FaArchive
                className={`text-xl ${showArchived ? "text-red-500" : "text-gray-700"}`}
            />
            <span style={{marginLeft : "5px"}}>
                {showArchived ? "Show Active Users" : "Show Archived Users"}
            </span>
            
        </Button>
      </div>

      {/* Users Grid */}
      {/* {useret?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useret.map((user) => (
            <CardUser user={user} key={user._id} />
          ))}
        </div>
      ) : useret ? (
        <div className="text-center text-gray-500 flex flex-col items-center">
          <UserCheck className="w-12 h-12 text-gray-400" />
          <p className="mt-2 text-lg">No users found.</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )} */}
      {useret ? (
        <>
            {/* Food Grid */}
            <div className="flex flex-wrap justify-center">
                {useret?.length > 0 ?
                (useret.map((user, i) => (
                    <CardUser key={i} user={user} currUser={currUser} currentPage={currentPage}/>
                )))
                :
                <div className="text-center text-gray-500 flex flex-col items-center">
                  <UserCheck className="w-12 h-12 text-gray-400" />
                  <p className="mt-2 text-lg">No users found.</p>
                </div>

                }
                
            </div>
                    {/* Pagination */}
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <SpinnerDeepSeek />
                </div>
            )}
    </div>
  );
};

export default ListUsers;
