import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/Signin';
import Registration from './components/signup/Register';
import Terms from './components/signup/Terms';
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/guest/profile';
import ForgotPassword from './components/password/ForgotPassword';
import ResetPassword from './components/password/resetPassword';
import Header from './components/header/Header';
import LandingPage from './components/pages/LandingPage';
import UpdatePassword from './components/password/UpdatePassword';
import ResetPassword from './components/password/resetPassword';
import Bookings from './components/restaurant/bookings/Bookings';
import EachBooking from './components/restaurant/bookings/EachBooking';
import Rejected from './components/restaurant/registration/Rejected';
import ThankYou from './components/restaurant/registration/ThankYou';
import RestaurantHome from './components/restaurant/registration/registerForm';
import About from './components/restaurant/restaurantOwner/About';
import AddMenu from './components/restaurant/restaurantOwner/AddMenu';
import AddTable from './components/restaurant/restaurantOwner/AddTable';
import RestaurantDashboard from './components/restaurant/restaurantOwner/Manage';
import UpdateRestaurant from './components/restaurant/restaurantOwner/UpdateRestaurant';
import ResHome from './components/restaurant/registration/registerForm';
import Home from './components/Home/Home';
import TableDisplay from './components/tables/tablesDisplay';
import TableBook from './components/booking/tableBook';
import axiosInstance from './config/axios';
import bookingContext from './contextApi/bookingContext';
import restaurantContext from './contextApi/restaurantContext';
import userContext from './contextApi/userContext';
import bookingReducer from './reducer-hook/bookingReducer';
import restaurantReducer from './reducer-hook/restaurantReducer';
import userReducer from './reducer-hook/userRedcer';
const BookingIntialState = {
    restaurantBookings: [],
    approvedBookings: [],
    rejectedBookings: []
}

import Success from './components/payment/paymentSuccess';
import Failure from './components/payment/paymentFailure';
import Display from './components/pages/search';


function App() {
    const [userState, userDispatch] = useReducer(userReducer, { userDetails: {} });
    const [restaurantState, restaurantDispatch] = useReducer(restaurantReducer, { restaurantOwner: {}, allRestaurants: [] });
    const [bookingState, bookingDispatch] = useReducer(bookingReducer, BookingIntialState)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                try {
                    const userDetails = await axiosInstance.get('/api/user/profile', {
                        headers: {
                            Authorization: token,
                        },
                    });
                    userDispatch({ type: 'GET_USER', payload: userDetails.data });
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    }, []);

    useEffect(() => {
        if (Object.keys(userState.userDetails).length > 0) {
            (async () => {
                try {
                    const { data } = await axiosInstance.get(`/api/restaurant/${userState.userDetails._id}`, {
                        headers: {
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                    restaurantDispatch({ type: 'GET_RESTAURANT', payload: data })
                } catch (err) {
                    console.log(err)
                }

            })()
        }
    }, [userState.userDetails])
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axiosInstance('/api/getAll', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                restaurantDispatch({ type: 'GET_ALL', payload: data });
            } catch (e) {
                console.log(e, 'err in getAll res');
            }
        })()

    }, [])


    console.log(restaurantState && restaurantState, "234")
    return (
        <BrowserRouter>
            <userContext.Provider value={{ userState, userDispatch }}>
                <restaurantContext.Provider value={{ restaurantState, restaurantDispatch }}>
                    <bookingContext.Provider value={{ bookingState, bookingDispatch }}>

                        <div className="gradient-background">
                            <Header />
                            <Routes>
                                <Route path='/register' element={<Registration />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/terms' element={<Terms />} />
                                <Route path='/restaurantHome' element={<RestaurantHome />} />
                                <Route path='/admindashboard' element={<AdminDashboard />} />
                                <Route path='/forgotPassword' element={<ForgotPassword />} />
                                <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />
                                <Route path='/userprofile' element={<Profile />} />
                                <Route path='/addtable' element={<AddTable />} />
                                <Route path='/home' element={<LandingPage />} />
                                <Route path='/register/thankyou' element={<ThankYou />} />
                                <Route path='/rejected' element={<Rejected />} />
                                <Route path='/restaurant/manage' element={<RestaurantDashboard />} />
                                <Route path='/addmenu' element={<AddMenu />} />
                                <Route path='/updatepassword' element={<UpdatePassword />} />
                                <Route path='/updaterestaurant' element={<UpdateRestaurant />} />
                                <Route path='/reshome' element={<ResHome />} />
                                <Route path='/aboutrestaurant' element={<About />} />
                                <Route path='/bookings' element={<Bookings />} />
                                <Route path='/booking/:id' element={<EachBooking />} />

                                <Route path='/home' element={<Home />} />
                                <Route path='/' element={<Display />} />
                                <Route path='/search' element={<Home />} />
                                <Route path='/restaurant/:restaurantId' element={<RestaurantDashboard />} />
                                <Route path='/table/:restaurantId' element={<TableDisplay />} />
                                <Route path='/api/user/:userId/restaurant/:restaurantId/table/:tableId/booking' element={<TableBook />} />
                                <Route path='/success' element={<Success />} />
                                <Route path='/failure' element={<Failure />} />

                            </Routes>
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                    </bookingContext.Provider>

                </restaurantContext.Provider>
            </userContext.Provider>
        </BrowserRouter>
    );
}

export default App;
