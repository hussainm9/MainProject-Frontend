import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css'
import configureStore from './redux/store/configureStore';
import App from './App';

const store = configureStore()

console.log(store.getState())

store.subscribe(() => {
    
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store} >
        <App />
    </Provider>



);

