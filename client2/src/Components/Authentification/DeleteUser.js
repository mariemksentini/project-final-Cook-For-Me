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
  const handleShow = async () => {
    await dispatch(checkUser({ email, password }));
    if (!checked) {
      alert("Wrong password!");
      setEmail('')
      setPassword('')
    }
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
    <div className="flex items-center justify-center bg-gray-100" style={{ height: "87vh" }}>
      {user && localStorage.getItem("token") ? (
        <form className="space-y-4 p-6 mx-auto bg-white shadow-md rounded-lg" style={{ width: "400px" }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <Button onClick={handleShow} className="w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300">
            Delete User
          </Button>

          <Modal show={show && user.email === email} onClose={handleClose}>
            <Modal.Header>Confirm Deletion</Modal.Header>
            <Modal.Body>
              <p className="text-gray-700">Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="gray"
                onClick={handleClose}
                className="bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={(e) => {
                  handleDelete(e);
                  handleClose();
                }}
                className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300"
              >
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={show && user?.email !== email} onClose={handleClose}>
          <Modal.Header>Access Denied</Modal.Header>
          <Modal.Body>
            <p className="text-gray-700">
              The email provided does not match the account on record.<br />
              If you believe this is a mistake, please contact the administrator.
            </p>
          </Modal.Body>

            <Modal.Footer>
              <Button
                color="gray"
                onClick={handleClose}
                className=""
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  navigate('/ContactAdmin')
                  handleClose();
                }}
                className=""
              >
                Contact admin
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default DeleteUser;