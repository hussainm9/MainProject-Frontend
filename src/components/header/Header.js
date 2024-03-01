import React, { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaRegCircleUser } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/userAction';

export default function Header() {
  const [role, setRole] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 450);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    searchParams.set('searchTerm', searchTerm);
    navigate(`/search?${searchParams.toString()}`);
    setSearchTerm('');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const token = localStorage.getItem('token');

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 mb-5 me-3 bg-body rounded w-100" >
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Logo" className="logo" style={{ width: '150px' }} />
        </Link>
        
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav" >
          <ul className={`navbar-nav ${isSmallScreen ? 'ms-auto' : 'me-auto'} nav_ul`}>
            <li className="nav-item" style={{ marginRight: '15px' }}>
              <form onSubmit={handleSubmit} className={`input-group ${isSmallScreen ? 'ms-4' : 'me-4'}`}>
                <input
                  type='text'
                  placeholder='Search....'
                  className='form-control me-6 search_input'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="input-group-text" >
                  <BiSearch style={{ fontSize: 'calc(1em + 0.5vw)' }} />
                </button>
              </form>
            </li>
            {role === 'guest' || !token ? (
              <>
                <li className="nav-item" >
                  <Link className="nav-link active" to="about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="book">Book Table</Link>
                </li>
              </>
            ) : null}
            {role === 'restaurantOwner' ? (
              <>
                <li className="nav-item">
                  <Link to='/aboutrestaurant' className="nav-link active" >About</Link>
                </li>
                <li className="nav-item">
                  <Link to='/bookings' className="nav-link active" >Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/addtable">Add Table</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/addmenu">Add Menu</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/restaurant/manage">Manage</Link>
                </li>
              </>
            ) : null}
          </ul>
          {token ? (
            <div ref={profileRef} className="d-flex align-items-center position-relative">
              <div className="dropdown" onClick={toggleProfileDropdown}>
                <FaRegCircleUser className="profile-icon" style={{ fontSize: '30px' }} />
                {user && user.username}
              </div>
              {showProfileDropdown && (
                <div className='position-absolute top-100 start-0 bg-white p-1 shadow rounded'>
                  <p onClick={handleLogout} className='whitespace-nowrap cursor-pointer fs-6'>Logout</p>
                  <p onClick={() => navigate('/profile')} className='whitespace-nowrap cursor-pointer text-sm'>Profile</p>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="btn btn-primary ms-2 btn-sm" role="button">
              <span>Sign Up</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
