import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ handleLogout }) => {
  return (
    <div className="profile-dropdown">
      <Link to="/userProfile" className="dropdown-item" role="button">
        Profile
      </Link>
      <div className="dropdown-divider"></div>
      <button onClick={handleLogout} className="dropdown-item" >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;