import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Signin';
import Registration from './components/Register Components/Register';
import Terms from './components/Register Components/Terms';
import AdminHome from './components/adminHome/Home';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/resetPassword';
import GuestHome from './components/guestHome/Home';
import RestaurantDashboard from './components/restaurantHome/Dashboard';
import RestaurantHome from './components/restaurantHome/Home';
import ThankYou from './components/restaurantHome/ThankYou';
function App(){

    return(
        <BrowserRouter>
       
        
    <div>
        {/* <h2>React Fundamentals</h2> */}
        
        
        <Routes>

            <Route path='/register' element={<Registration/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/terms' element={<Terms/>}  />
            <Route path='/restaurantHome' element={<RestaurantHome/>} />
            <Route path='/adminHome' element={<AdminHome/>} />
            <Route path='/forgotPassword' element={<ForgotPassword/>} />
            <Route path='/resetPassword/:id/:token' element={<ResetPassword/>} />

            <Route path='/guestHome' element={<GuestHome/>}/>
            <Route path='/register/thankyou' element={<ThankYou/>} />
            <Route path='/restaurant/:restaurantId' element={<RestaurantDashboard/>} />

        </Routes>
        
        

    </div>
        </BrowserRouter>
    )

}
export default App