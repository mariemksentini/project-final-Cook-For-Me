import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { current, logOut } from '../Redux/Actions/AuthActions';
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";

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
        await dispatch(logOut());
        navigate('/');
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

    return (
        <Navbar 
            fluid
            className={`fixed border-b-2 border-white top-0 left-0 w-full z-50 transition-all items-center duration-300 ${
                isHomePage
                    ? isScrolled
                        ? "bg-white shadow-md"
                        : "bg-transparent"
                    : "bg-white shadow-md"
            }`}
        >
            <Navbar.Brand as={Link} to="/">
                <img 
                    src={isHomePage && !isScrolled ? "COOK_FOR_ME_white.png" : "COOK_FOR_ME_green.png"} 
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
                    Foods
                </Navbar.Link>
                <Navbar.Link as={Link} to="/ContactAdmin" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                    Contact Admin
                </Navbar.Link>

                {(token && user) ? (
                    <>
                        <Dropdown arrowIcon={false} className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"} inline label={user.name} >
                            <Dropdown.Header>
                                <span className="block text-sm">{user.name}</span>
                                <span className="block truncate text-sm font-medium">{user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Navbar.Link as={Link} to="/Profil">Profil</Navbar.Link>
                            </Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Navbar.Link as={Link} to="/Profil" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Profil
                        </Navbar.Link>

                        {user?.role === 'admin' ? (
                            <>
                                <Navbar.Link as={Link} to="/IndexPaniers" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Paniers
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/GetAllUsers" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Users
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/ListRequests" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    ReqsAdmin
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/CommandesAdmin" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Comms Admin
                                </Navbar.Link>
                            </>
                        ) : (
                            <>
                                <Navbar.Link as={Link} to="/IndexPanier" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Own Panier
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/CommandesAsClient" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Commandes as Client
                                </Navbar.Link>
                                <Navbar.Link as={Link} to="/CommandesAsChef" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                                    Commandes as Chef
                                </Navbar.Link>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Navbar.Link as={Link} to="/SignIn" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Sign In
                        </Navbar.Link>
                        <Navbar.Link as={Link} to="/SignUp" className={isHomePage && !isScrolled ? "text-white" : "text-teal-900"}>
                            Sign Up
                        </Navbar.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavGeneral;
