import {createStore,combineReducers} from 'redux'
import { thunk } from "redux-thunk"
import { applyMiddleware } from "redux"
import RestaurantReducer from '../reducers/restaurantReducer'
const configureStore = () => {
    const store= createStore(combineReducers({
     restaurant:RestaurantReducer,
    }), applyMiddleware(thunk))
    return store

}

export default configureStore