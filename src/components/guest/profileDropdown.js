import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const token = localStorage.getItem('token');
  console.log(token, 'profileDropDown');
  const tokenData = jwtDecode(token);
  console.log(tokenData.role);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  let profileDropdownContent;

  switch (tokenData.role) {
    case 'restaurantOwner':
      profileDropdownContent = (
        <>
          <Link to='/updatepassword' className="dropdown-item" role="button">
            Update Password
          </Link>
          <Link to='/updaterestaurant' className="dropdown-item" role="button">
            Update Restaurant
          </Link>
          <button onClick={handleLogout} className="dropdown-item">
            Logout
          </button>
        </>
      );
      break;
    case 'guest':
      profileDropdownContent = (
        <>
          <Link to="/profile" className="dropdown-item" role="button">
            Profile
          </Link>
          <button onClick={handleLogout} className="dropdown-item">
            Logout
          </button>
        </>
      );
      break;
    case 'admin':
      profileDropdownContent = (
        <button onClick={handleLogout} className="dropdown-item">
          Logout
        </button>
      );
      break;
    default:
      profileDropdownContent = null;
  }

  return (
    <div>
      <div className="profile-dropdown">
        {profileDropdownContent}
      </div>
    </div>
  );
};

export default ProfileDropdown;
