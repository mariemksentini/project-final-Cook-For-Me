import {combineReducers} from 'redux'
import ErrorsReducer from "./ErrorsReducer";
import AuthReducer from "./AuthReducer";
import FoodReducer from './FoodReducer';
import PanierReducer from './PanierReducer';
import CommandeReducer from './CommandeReducer';
import AdminReqReducer from './AdminReqReducer';
import rendezVousReducer from './RendezVousReducer';
const rootReducer = combineReducers({AuthReducer, ErrorsReducer, PanierReducer, FoodReducer, CommandeReducer, AdminReqReducer, rendezVousReducer})

export default rootReducer