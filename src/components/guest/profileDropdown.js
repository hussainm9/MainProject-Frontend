import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link } from 'react-router-dom';


const ProfileDropdown = ({ handleLogout }) => {
  const token = localStorage.getItem('token')
  console.log(token,'profileDropDown');
  const tokenData = jwtDecode(token)
  console.log(tokenData.role);

  return (
    <div>
      {tokenData.role=='restaurantOwner'?
      (<div>
        <div className="profile-dropdown">
            <Link to="/userProfile" className="dropdown-item" role="button">
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Link to='/updatepassword' className="dropdown-item" role="button">
              Update Password</Link>
              <div className="dropdown-divider"></div>
              <Link to='/updaterestaurant' className="dropdown-item" role="button">
          Update Restaurant</Link>
          <div className="dropdown-divider"></div>
      
            <button onClick={handleLogout} className="dropdown-item" >
              Logout
            </button>
          </div>
      </div>)
      :(<div>
        <div className="profile-dropdown">
        <Link to="/userProfile" className="dropdown-item" role="button">
          Profile
        </Link>
        <div className="dropdown-divider"></div>
        <Link to='/updatepassword' className="dropdown-item" role="button">
          Update Password</Link>
          <div className="dropdown-divider"></div>
         
  
        <button onClick={handleLogout} className="dropdown-item" >
          Logout
        </button>
      </div>

      </div>)}
     
   
    </div>
  );
};

export default ProfileDropdown;