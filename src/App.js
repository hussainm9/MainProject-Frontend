import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/Login/Signin';
import Registration from './components/Register Components/Register';
import Terms from './components/Register Components/Terms';
import AdminDashboard from './components/admin/AdminDashboard';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/resetPassword';
import GuestHome from './components/guestHome/Home';
import RestaurantHome from './components/restaurantHome/Home';
import AddMenu from './components/menu/AddMenu';
import Header from './components/header/Header';
import AddTable from './components/pages/AddTable';
import LandingPage from './components/pages/LandingPage';






function App() {



    return (
        <BrowserRouter>


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
                    <Route path='/addmenu' element={<AddMenu />} />
                    <Route path='/guestHome' element={<GuestHome />} />
                    <Route path='/addtable' element={<AddTable/>}/>
                    <Route path='/home' element={<LandingPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )

}
export default App