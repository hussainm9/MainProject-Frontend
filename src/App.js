

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/Login/Signin';
import Registration from './components/Register Components/Register';
import Terms from './components/Register Components/Terms';
import AdminDashboard from './components/admin/AdminDashboard';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/resetPassword';
import GuestHome from './components/guestHome/Home';
import RestaurantHome from './components/restaurantHome/Home';

import Profile from './components/guestHome/profile';
import Header from './components/header/Header';
import AddTable from './components/pages/AddTable';
import RestaurantDashboard from './components/restaurantHome/Dashboard';
import RestaurantHome from './components/restaurantHome/Home';
import Rejected from './components/restaurantHome/Rejected';
import ThankYou from './components/restaurantHome/ThankYou';


import About from './components/About';








function App() {
    return (
        <BrowserRouter>

            


import axiosInstance from './config/axios';
import restaurantContext from './contextApi/restaurantContext';
import userContext from './contextApi/userContext';
import restaurantReducer from './useReducerHook-reducers/restaurantReducer';
import userReducer from './useReducerHook-reducers/userRedcer';





function App() {
    const [userState, userDispatch] = useReducer(userReducer, { userDetails: {} });
    const [restaurantState, restaurantDispatch] = useReducer(restaurantReducer, { restaurantOwner:{},allRestaurants: []});


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

    useEffect(()=>{
        if(Object.keys(userState.userDetails).length > 0){
            (async ()=>{
                try {
                    const { data } = await axiosInstance.get(`/api/restaurant/${userState.userDetails._id}`, {
                        headers: {
                            "Authorization": localStorage.getItem('token')
                        }
                    })
                    restaurantDispatch({ type: 'GET_RESTAURANT', payload:data })
                }catch(err){
                    console.log(err)
                }
    
            })()
        }
    }, [userState.userDetails])
    useEffect(()=>{
        (async()=>{
            try{
                const {data} =await axiosInstance('/api/getAll',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
               // console.log(data);
                restaurantDispatch({type:'GET_ALL',payload:data})



            }catch(e){
                console.log(e,'err in getAll res');
            }
        })()

    },[])


    console.log(restaurantState && restaurantState, "234")
    return (
        <BrowserRouter>

            <userContext.Provider value={{userState,userDispatch}}>
            <restaurantContext.Provider value={{restaurantState, restaurantDispatch}}>

            <div>
                {/* <h2>React Fundamentals</h2> */}

                <Header />

                <Routes>
                    
                    <Route path='/about' element={<About/>}/>
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
                    <Route path='/register/thankyou' element={<ThankYou />} />
                    <Route path='/rejected' element={<Rejected />} />
                    <Route path='/restaurant/:restaurantId' element={<RestaurantDashboard />} />
                </Routes>
            </div>

            

            </restaurantContext.Provider>
            </userContext.Provider>

        </BrowserRouter>
    )

}
export default App