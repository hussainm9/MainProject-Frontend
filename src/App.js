import React,{useReducer,useEffect} from 'react'
import axios from 'axios';
import userContext from './contextApi/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Signin';
import Registration from './components/Register Components/Register';
import Terms from './components/Register Components/Terms';
import AdminDashboard from './components/admin/AdminDashboard';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/resetPassword';
import GuestHome from './components/guestHome/Home';
import userReducer from './useReducerHook-reducers/userRedcer';
import RestaurantHome from './components/restaurantHome/Home';
import Header from './components/header/Header';
import AddTable from './components/pages/AddTable';
import LandingPage from './components/pages/LandingPage';
import RestaurantDashboard from './components/restaurantHome/Dashboard';
import Rejected from './components/restaurantHome/Rejected';
import ThankYou from './components/restaurantHome/ThankYou';
import Profile from './components/guestHome/profile';







function App() {
    const [userState, userDispatch] = useReducer(userReducer, { userDetails: {} });

    useEffect(() => {
        (async () => {
            try {
                const userDetails = await axios.get('http://localhost:3786/api/user/profile', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                console.log(userDetails.data);
                userDispatch({ type: 'GET_USER', payload: userDetails.data });
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);



    return (
        <BrowserRouter>

            <userContext.Provider value={{userState,userDispatch}}>

            <div>
                {/* <h2>React Fundamentals</h2> */}

                <Header />

                <Routes>

                    <Route path='/register' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/restaurantHome' element={<RestaurantHome />} />
                    <Route path='/admindashboard' element={<AdminDashboard />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />
                    <Route path='/guestHome' element={<GuestHome />} />
                    <Route path='userprofile' element={<Profile/>}/>
                    <Route path='/guestHome' element={<GuestHome />} />
                    <Route path='/addtable' element={<AddTable />} />
                    <Route path='/home' element={<LandingPage />} />
                    <Route path='/register/thankyou' element={<ThankYou />} />
                    <Route path='/rejected' element={<Rejected />} />
                    <Route path='/restaurant/:restaurantId' element={<RestaurantDashboard />} />
                </Routes>
            </div>

            </userContext.Provider>

        </BrowserRouter>
    )

}
export default App