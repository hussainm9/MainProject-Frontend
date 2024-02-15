import 'bootstrap/dist/css/bootstrap.css';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../../contextApi/userContext';
import ProfileDropdown from '../guest/profileDropdown';
import logo from "../images/logo.png";
import './header.css';

export default function Header() {
  const [role, setRole] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { userState } = useContext(userContext)

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log(token,'headers page');

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    if (token) {
      try {
        const { role } = jwtDecode(token);
        if (role) {
          setRole(role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return (
    <>
    
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-5 bg-body rounded">
        <div className="container">
          <Link className="navbar-brand" href="/home">
            <div className="row">
              <div className="col-md-2">
                <img height={50} src={logo} className="rounded float-left" alt="Logo" />
              </div>
            </div>
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto nav_ul">
              <li>
                <div className="d-flex align-items-center ms-4 box">
                  <BiSearch className="search-icon" />
                  <input
                    className='form-control me-6'
                    type='text'
                    placeholder='Search....'
                  />
                </div>
              </li>

  

              {role === 'guest' || !token ? (
                <div>
                              <li className="nav-item pe-5">
                <Link className="nav-link active" aria-current="page" href="about">About</Link>
              </li>
              <li className="nav-item pe-5">
                <Link className="nav-link active" aria-current="page" href="home">Home</Link>
              </li>

                <li className="nav-item pe-3">
                  <Link className="nav-link active" href="book">Book Table</Link>
                </li>
                </div>
              ) : null}

              {role === 'restaurantOwner' ? (
                <>
                      <li className="nav-item pe-5">
                <Link to='/aboutrestaurant' className="nav-link active" aria-current="page" href="about">About</Link>
              </li>
              <li className="nav-item pe-5">
                <Link to='/bookings' className="nav-link active" aria-current="page" href="home">Home</Link>
              </li>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/addtable">Add Table</Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/addmenu">Add Menu</Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/restaurant/manage">Manage</Link>
                  </li>
                </>
              ) : null}

            </ul>

            {token ? (
              <div className="d-flex align-items-center">
                <div className="dropdown" onClick={toggleProfileDropdown}>
                  <CgProfile className="profile-icon" style={{ fontSize: '40px' }}/>
                  {userState.userDetails.username}
                  {showProfileDropdown && <ProfileDropdown handleLogout={handleLogout} />}
                </div>
              </div>
            ) : (
              <Link to="/register" className="btn btn-primary ms-2 btn-sm" role="button">
                <span>Sign Up</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    
    </>
  );
}