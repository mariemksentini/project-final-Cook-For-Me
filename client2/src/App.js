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
import ContactAdmin from './Components/ContactAdmin';
import ListRequests from './Components/AdminRequests/ListRequests';
import CommandesAdmin from './Components/Commandes/CommandesAdmin';
import Footerr from './Components/Footerr';
// import PaginationComponent from './Components/Food/PaginationComp';


function AppContent (){
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div style={{ marginTop: isHomePage ? "0" : "110px" }}>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/EditProfil' element={<PrivateRoute><EditProfil/></PrivateRoute> }/>
        <Route path='/Profil' element={<PrivateRoute><Profil/></PrivateRoute> }/>
        <Route path='/DeleteUser' element={<PrivateRoute><DeleteUser/></PrivateRoute>}/>

        <Route path='/GetAllUsers' element={<ListUsers/>}/>
        <Route path='/UserDetails/:id' element={<UserDetails/>}/>

        <Route path='/IndexFoods' element={<IndexFoods/>}/>
        <Route path='/FoodDetails/:id' element={<FoodDetails/>}/>
        <Route path='/CreateFood' element={<CreateFood/>}/>
        <Route path='/EditFood/:id' element={<EditFood/>}/>

        {/* for pagination */}
        {/* <Route path='/PaginationComponent' element={<PaginationComponent/>}/> */}

        <Route path='/IndexPanier' element={<IndexPanier/>}/>
        <Route path='/ProductDetails' element={<ProductDetails/>}/>

        {/* {bch tetnaha} */}
        <Route path='/IndexPaniers' element={<IndexPaniers/>}/> 
        <Route path='/PanierDetails/:id' element={<PanierDetails/>}/>

        <Route path='/CommandesAsClient' element={<CommandesAsClient/>}/>
        <Route path='/CommandesAsChef' element={<CommandesAsChef/>}/>

        <Route path='/CommandesAdmin' element={<CommandesAdmin/>}/>

        <Route path='/ContactAdmin' element={<ContactAdmin/>}/>

        <Route path='/ListRequests' element={<ListRequests/>}/>
      </Routes>
      <ErrorsCom/>
    </div>
  )
}
function App() {
  
  return (
    <>
    
      <NavGeneral />
      <AppContent />
    
    <Footerr/>
    </>
  );
}

export default App;
