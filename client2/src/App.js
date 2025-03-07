import './App.css';
import NavGeneral from './Components/NavGeneral';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/Authentification/SignUp';
import SignIn from './Components/Authentification/SignIn';
import EditProfil from './Components/Authentification/EditProfil';
import Profil from './Components/Profil';
import ErrorsCom from './Components/ErrorsCom';
import DeleteUser from './Components/Authentification/DeleteUser';
import PrivateRoute from './Components/PrivateRoute';
import ListUsers from './Components/Users/ListUsers';
import UserDetails from './Components/Users/UserDetails';
import CreateFood from './Components/Food/CreateFood';
import EditFood from './Components/Food/EditFood';
import FoodDetails from './Components/Food/FoodDetails';
import IndexFoods from './Components/Food/IndexFood';
import IndexPanier from './Components/Panier/IndexPanier';
import ProductDetails from './Components/Panier/ProductDetails';
import IndexPaniers from './Components/Paniers/IndexPaniers';
import PanierDetails from './Components/Paniers/PanierDetails';
import CommandesAsClient from './Components/Commandes/CommandesAsClient';
import CommandesAsChef from './Components/Commandes/CommandesAsChef';
import ContactAdmin from './Components/AdminRequests/ContactAdmin';
import ListRequests from './Components/AdminRequests/ListRequests';
import CommandesAdmin from './Components/Commandes/CommandesAdmin';
import Footerr from './Components/Footerr';
import CommandeDetails from './Components/Commandes/CommandeDetails';
import ContactAdminAsGuest from './Components/AdminRequests/ContactAdminAsGuest';
import CommandesAsLivreur from './Components/Commandes/CommandesAsLivreur';
import { useSelector } from 'react-redux';
import ClickableMap from './Components/Map/ClickableMap';
import MapComponent from './Components/Map/Map';
import FoodOwnerID from './Components/Food/FoodOwnerID';
import MapLivreur from './Components/Map/MapLivreur';
import DashboardAdmin from './Components/Dashboard/DashboardAdmin';
import DashboardUser from './Components/Dashboard/DashboardUser';
import DashboardLivreur from './Components/Dashboard/DashboardLivreur';
import CalendarComponent from './Components/RendezVous/Calendar';
// import PaginationComponent from './Components/Food/PaginationComp';
import { registerLicense } from '@syncfusion/ej2-base';
import AddRendezVous from './Components/RendezVous/AddRendezVous';
import GeneralCalendar from './Components/RendezVous/GeneralCalendar';
import RendezVousDetails from './Components/RendezVous/RendezVousDetails';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhKYVJ1WmFZfVtgdVdMYlpbQHJPIiBoS35Rc0VgWXlfcnZTQmRUUkd0');


function AppContent (){
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  

  return (
    <div style={{ marginTop: isHomePage ? "0" : "110px" }}>
      <ErrorsCom/>
      <Routes>
        <Route path='/' element={<Home/>}/> {/* GUEST ADMIN USER LIVREUR */}
        <Route path='/SignUp' element={<SignUp/>}/> {/* GUEST  */}
        <Route path='/SignIn' element={<SignIn/>}/> {/* GUEST  */}
        <Route path='/EditProfil' element={<PrivateRoute roles={["admin", "user", "livreur", "privateChef"]}><EditProfil/></PrivateRoute> }/> {/* ADMIN USER LIVREUR */}
        <Route path='/Profil' element={<PrivateRoute roles={["admin", "user", "livreur", "privateChef"]}><Profil/></PrivateRoute> }/> {/*  ADMIN USER LIVREUR */}
        <Route path='/DeleteUser' element={<PrivateRoute roles={[ "user", "livreur", "privateChef"]}><DeleteUser/></PrivateRoute>}/> {/* USER LIVREUR */}

        <Route path='/GetAllUsers' element={<PrivateRoute roles={["admin", "user", "livreur", "privateChef"]}><ListUsers/></PrivateRoute>}/> {/*  ADMIN USER LIVREUR */}
        <Route path='/UserDetails/:id' element={<PrivateRoute roles={["admin", "user", "livreur", "privateChef"]}><UserDetails/></PrivateRoute>}/> {/* ADMIN USER (read only + no chart) LIVREUR (read only + no chart)*/}

        <Route path='/IndexFoods' element={<IndexFoods/>}/> {/* GUEST ADMIN USER LIVREUR */}
        <Route path='/FoodDetails/:id' element={<FoodDetails/>}/> {/* GUEST ADMIN USER LIVREUR */}
        <Route path='/CreateFood' element={<PrivateRoute roles={[ "user"]}><CreateFood/></PrivateRoute> }/> {/* USER */}
        <Route path='/EditFood/:id' element={<PrivateRoute roles={["admin", "user"]}><EditFood/></PrivateRoute>}/> {/* ADMIN USER  */}
        <Route path='/FoodOwnerID/:id' element={<FoodOwnerID/>} />

        <Route path='/IndexPanier' element={<PrivateRoute roles={[ "user"]}> <IndexPanier/></PrivateRoute>}/> {/* USER  */}
        <Route path='/ProductDetails' element={<PrivateRoute roles={[ "user"]}><ProductDetails/></PrivateRoute>}/> {/* USER  */}

        {/* {bch tetnaha} */}
        <Route path='/IndexPaniers' element={<PrivateRoute roles={["admin"]}><IndexPaniers/></PrivateRoute>}/>  {/*  ADMIN  */}
        <Route path='/PanierDetails/:id' element={<PrivateRoute roles={["admin"]}><PanierDetails/></PrivateRoute>}/> {/*  ADMIN  */}

        <Route path='/CommandesAsClient' element={<PrivateRoute roles={["user"]}><CommandesAsClient/></PrivateRoute>}/> {/*  USER  */}
        <Route path='/CommandesAsChef' element={<PrivateRoute roles={[ "user"]}><CommandesAsChef/></PrivateRoute>}/> {/* USER  */}
        <Route path='/CommandesAsLivreur' element={<PrivateRoute roles={[ "livreur"]}><CommandesAsLivreur/></PrivateRoute>}/> {/* LIVREUR  */}

        <Route path='/CommandesAdmin' element={<PrivateRoute roles={["admin"]}><CommandesAdmin/></PrivateRoute>}/> {/*ADMIN  LIVREUR (read only + confirm delivery and no delete) */}
        <Route path='/CommandeDetails/:id' element={<PrivateRoute roles={["admin", "user", "livreur"]}><CommandeDetails/></PrivateRoute>}/> {/* ADMIN USER LIVREUR (read only + confirm delivery and no delete) */}

        <Route path='/ContactAdmin' element={<ContactAdmin/>}/> {/*  USER LIVREUR */}
        <Route path='/ContactAdminAsGuest' element={<ContactAdminAsGuest/>}/> {/* GUEST  */}

        <Route path='/ListRequests' element={<PrivateRoute roles={["admin"]}><ListRequests/></PrivateRoute>}/> {/*  ADMIN  */}
        <Route path='/map' element={<MapComponent latitude={36.8065} longitude={10.1815}/>}/>
        <Route path='/ClickableMap' element={<ClickableMap/>}/>
        <Route path='/MapLivreur' element={<PrivateRoute roles={["livreur"]}><MapLivreur/></PrivateRoute>} />

        <Route path='/DashboardAdmin' element={<PrivateRoute roles={["admin"]}><DashboardAdmin/></PrivateRoute>} />
        <Route path='/DashboardUser' element={<PrivateRoute roles={["user"]}><DashboardUser/></PrivateRoute>} />
        <Route path='/DashboardLivreur' element={<PrivateRoute roles={["livreur"]}><DashboardLivreur/></PrivateRoute>} />

        <Route path='/Calendar' element={<CalendarComponent/>}/>
        <Route path='/AddRendezVous' element={<AddRendezVous/>}/>
        <Route path='/GeneralCalendar' element={<GeneralCalendar/>}/>
        <Route path='/RendezVousDetails/:id' element={<RendezVousDetails/>}/>
      </Routes>
      
    </div>
  )
}
function App() {
  
  return (
    <>
    
      <NavGeneral />
      <AppContent />
    
    
    </>
  );
}

export default App;
