import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import tableReducer from '../reducers/tableReducer'
import { menuRedcer } from '../reducers/menuReducer'
import { bookReducer } from '../reducers/bookingReducer'


const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        table: tableReducer,
        menu: menuRedcer,
        book:bookReducer

    }), applyMiddleware(thunk))
    return store
}

export default configureStore