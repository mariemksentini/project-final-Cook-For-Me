import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { current, logOut } from '../Redux/Actions/AuthActions';
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { ChefHat, ClipboardCopy, ClipboardPaste, Inbox, Map, ShoppingCart, Users, UsersRound } from 'lucide-react';

const NavGeneral = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.AuthReducer.user);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && dispatch(current());
    }, []);

    const handleLogOut = async () => {
        navigate('/');
        await dispatch(logOut());
        
    };

    // Check if current route is "/"
    const isHomePage = location.pathname === "/";

    // State to track scroll position
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); // Manage the toggle state

    useEffect(() => {
        if (!isHomePage) return; // Apply effect only on home page

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHomePage]);

    const toggleNav = () => setIsNavOpen(prev => !prev); // Function to toggle navbar

    const bgColor = "rgba(255, 255, 255, 0.80)"

    return (
        <Navbar 
            fluid
            className={`fixed border-b-2  top-0 left-0 w-full z-50 transition-all items-center duration-300 ${
                isHomePage
                    ? isScrolled
                        ? `shadow-md`
                        : "bg-transparent"
                    : `shadow-md`
            }`}
            style={{ backgroundColor: isHomePage && !isScrolled ? "transparent" : bgColor , borderColor : bgColor}}
        >
            <Navbar.Brand as={Link} to="/">
                <img 
                    src={isHomePage && !isScrolled ? "/COOK_FOR_ME_white.png" : "/COOK_FOR_ME_green.png"} 
                    alt="Cook For Me Logo"
                    style={{height : "80px"}}
                />
                <span className={`text-lg font-semibold ${isHomePage && !isScrolled ? "text-white" : "text-teal-900"}`}>
                    Cook For Me
                </span>
            </Navbar.Brand>

            {/* Toggle Button */}
            <div className="flex md:order-2">
                <Navbar.Toggle onClick={toggleNav} /> {/* Bind the toggle function */}
            </div>

            {/* Collapse Menu */}
            <Navbar.Collapse className={`flex items-center ${isNavOpen ? "block" : "hidden"}`}>
                <Navbar.Link as={Link} to="/" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} to="/IndexFoods" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                    Food
                </Navbar.Link>
            

                {(token && user) &&
                (   user.role === "user" 
                    ?
                    <>
                        
                        <Navbar.Link as={Link} to="/CommandesAsClient" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            My Orders
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/CommandesAsChef" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <ChefHat/>
                        </Navbar.Link>
                        <Navbar.Link title='Users' as={Link} to="/GetAllUsers" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <Users/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/map" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <Map/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/IndexPanier" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <ShoppingCart/>
                        </Navbar.Link>
                    </>
                    :
                    user.role === "admin" 
                    ?
                    <>
                        
                        <Navbar.Link as={Link} to="/CommandesAdmin" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Manage Orders
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/ListRequests" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <Inbox/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/GetAllUsers" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <UsersRound/>
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/map" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <Map/>
                        </Navbar.Link>
                    </>
                    :
                    user.role === 'livreur' ?
                    <>
                        <Navbar.Link as={Link} to="/CommandesAsLivreur" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Deliver Orders
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/MapLivreur" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            <Map/>
                        </Navbar.Link>
                    </>
                    :
                    <>
                        <Navbar.Link as={Link} to="/GeneralCalendar" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Calendar
                        </Navbar.Link>
                        
                    </>
                )
                }
                {(token && user) &&
                    <Dropdown arrowIcon={false} className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"} inline 
                    label={<img 
                        src={user.image} 
                        alt="Profile" 
                        className={`w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                            isHomePage && !isScrolled ? "border-white" : "border-teal-900"
                        }`} 
                        style={{ marginRight: "20px" }} 
                    />}>
                        <Dropdown.Header >
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header >
                        <Dropdown.Item as={Link} to="/Profil">
                            <Navbar.Link as={Link} to="/Profil">Profil</Navbar.Link>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/EditProfil">
                            <Navbar.Link as={Link} to="/EditProfil">Settings</Navbar.Link>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={user.role === 'admin' ? '/DashboardAdmin' : user.role === 'user' ? '/DashboardUser' : '/DashboardLivreur'} >
                            <Navbar.Link as={Link} to={user.role === 'admin' ? '/DashboardAdmin' : user.role === 'user' ? '/DashboardUser' : '/DashboardLivreur'} >Dashboard</Navbar.Link>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/ContactAdmin">
                            <Navbar.Link as={Link} to="/ContactAdmin">Contact us</Navbar.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item  onClick={handleLogOut} className='text-red-600'>Sign out</Dropdown.Item>
                    </Dropdown>
                }
                {(!token) && 
                <>
                <Navbar.Link as={Link} to="/map" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                    Our locations
                </Navbar.Link>
                <Navbar.Link as={Link} to="/ContactAdminAsGuest" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                    Contact us
                </Navbar.Link>
                <Navbar.Link style={{ border: "1px solid white" , padding : "10px" , marginTop : "-10px"}}  as={Link} to="/SignIn" className={isHomePage && !isScrolled ? "text-white mr-3 navBtnn" : "navBtnn mr-3 text-teal-900"}>
                    Register / Log in 
                </Navbar.Link>
                
                </>
                }


            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavGeneral;
//ContactAdminAsGuest