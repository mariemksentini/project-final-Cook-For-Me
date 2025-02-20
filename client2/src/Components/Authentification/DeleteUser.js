import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCheck, checkUser, current, deleteUser } from "../../Redux/Actions/AuthActions";
import { Button, Modal } from "flowbite-react";
const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checked = useSelector((state) => state.AuthReducer.checked);
  const user = useSelector((state) => state.AuthReducer.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(checked);

  const handleClose = () => dispatch(changeCheck());
  const handleShow = () => {
    dispatch(checkUser({ email, password }));
  };

  useEffect(() => {
    dispatch(current());
  }, []);

  useEffect(() => {
    setShow(checked);
  }, [checked]);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteUser(user._id));
  };

  return (
    <>
      {user && localStorage.getItem("token") ? (
        <>
          {/* Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>

          {/* Delete User Button */}
          <Button
            onClick={handleShow}
            className="mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Delete user
          </Button>

          {/* Modal */}
          <Modal show={show} onClose={handleClose}>
            <Modal.Header>Confirm deleting</Modal.Header>
            <Modal.Body>
              <p className="text-gray-700">Woohoo, are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={handleClose}
                className="bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
              >
                Close
              </Button>
              <Button
                color="blue"
                onClick={(e) => {
                  handleDelete(e);
                  handleClose();
                }}
                className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300"
              >
                Confirm delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default DeleteUser;