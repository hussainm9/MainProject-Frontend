import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Signin';
import Registration from './components/signup/Register';
//import Registration from './components/registration/Register'
import AdminDashboard from './components/admin/AdminDashboard';
import Profile from './components/guest/profile';
import Header from './components/header/Header';
import LandingPage from './components/pages/LandingPage';
import ForgotPassword from './components/password/ForgotPassword';
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
import Terms from './components/signup/Terms';
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



function App() {
    const [userState, userDispatch] = useReducer(userReducer, { userDetails: {} });
    const [restaurantState, restaurantDispatch] = useReducer(restaurantReducer, { restaurantOwner: {}, allRestaurants: [] });
    const [bookingState, bookingDispatch] = useReducer(bookingReducer, BookingIntialState)

    useEffect(() => {
        (async () => {
            try {
                const userDetails = await axiosInstance.get('/api/user/profile', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                console.log(userDetails.data._id, "235254325");
                userDispatch({ type: 'GET_USER', payload: userDetails.data });
            } catch (e) {
                console.log(e);
            }
        })();
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
                })
                console.log(data);
                restaurantDispatch({ type: 'GET_ALL', payload: data })



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
                                <Route path='userprofile' element={<Profile />} />
                                <Route path='/addtable' element={<AddTable />} />
                                <Route path='/home' element={<LandingPage />} />
                                <Route path='/register/thankyou' element={<ThankYou />} />
                                <Route path='/rejected' element={<Rejected />} />

                                <Route path='/restaurant/manage' element={<RestaurantDashboard />} />
                                <Route path='/addmenu' element={<AddMenu />} />
                                <Route path='/updatepassword' element={<UpdatePassword />} />
                                <Route path='/updaterestaurant' element={<UpdateRestaurant />} />
                                <Route path='/aboutrestaurant' element={<About />} />
                                <Route path='/bookings' element={<Bookings />} />
                                <Route path='/booking/:id' element={<EachBooking />} />
                            </Routes>
                        </div>
                    </bookingContext.Provider>
                </restaurantContext.Provider>
            </userContext.Provider>

        </BrowserRouter>
    )

}
export default App