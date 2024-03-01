import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiEdit, BiKey, BiLogOut, BiShoppingBag } from 'react-icons/bi';
import './profile.css'; // Import the CSS file

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="wrapper">
      {/* Side Navbar */}
      <nav id="sidebar" className="profile-sidebar">

        <ul className="list-unstyled components">
          <li>
            <button className="profile-button larger-icon" onClick={() => navigate('/my-orders')} title="My Orders">
              <BiShoppingBag size={24} />
              <h6>My Orders</h6>
            </button>
          </li>
          <li>
            <button className="profile-button larger-icon" onClick={() => navigate('/edit-profile')} title="Edit Profile">
              <BiEdit size={24} />
              <h6>Edit Profile</h6>
            </button>
          </li>
          <li>
            <button className="profile-button change-password larger-icon" onClick={() => navigate('/change-password')} title="Change Password">
              <BiKey size={24} />
              <h6>Change
                Password</h6>
            </button>
          </li>
          <li>
            <button className="profile-button larger-icon" onClick={handleLogout} title="Logout">
              <BiLogOut size={24} />
              <h6>Logout</h6>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
