import {combineReducers} from 'redux'
import ErrorsReducer from "./ErrorsReducer";
import AuthReducer from "./AuthReducer";
import FoodReducer from './FoodReducer';
import PanierReducer from './PanierReducer';
import CommandeReducer from './CommandeReducer';
import AdminReqReducer from './AdminReqReducer';
const rootReducer = combineReducers({AuthReducer, ErrorsReducer, PanierReducer, FoodReducer, CommandeReducer, AdminReqReducer})

export default rootReducer