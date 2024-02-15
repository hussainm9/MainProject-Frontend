import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import tableReducer from '../reducers/tableReducer'
import { menuRedcer } from '../reducers/menuReducer'


const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        table: tableReducer,
        menu: menuRedcer

    }), applyMiddleware(thunk))
    return store
}

export default configureStore