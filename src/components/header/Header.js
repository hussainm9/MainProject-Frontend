import 'bootstrap/dist/css/bootstrap.css';
import { jwtDecode } from 'jwt-decode';
import React, {useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaRegCircleUser } from "react-icons/fa6"
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser} from '../../redux/actions/userAction';

export default function Header() {
  const [role, setRole] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dispatch = useDispatch()

  const {user} = useSelector(state => state.user)

  console.log(user,'head')
  

  

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const name=localStorage.getItem('user')
  console.log(token);

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

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]); 

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg shadow-lg p-3 mb-5 bg-body rounded">
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

              <li className="nav-item pe-5">
                <Link className="nav-link active" aria-current="page" href="about">About</Link>
              </li>
              <li className="nav-item pe-5">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>

              {role === 'guest' || !token ? (
                <li className="nav-item pe-3">
                  <Link className="nav-link active" href="book">Book Table</Link>
                </li>
              ) : null}

              {role === 'restaurantOwner' ? (
                <>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/addtable">Add Table</Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/addmenu">Add Menu</Link>
                  </li>
                  <li className="nav-item pe-3">
                    <Link className="nav-link active" aria-current="page" to="/restaurant/:restaurantId">Dashboard</Link>
                  </li>
                </>
              ) : null}

            </ul>

            {token ? (
              <div className="d-flex align-items-center position-relative">
              <div className="dropdown" onClick={toggleProfileDropdown}>
                <FaRegCircleUser className="profile-icon" style={{ fontSize: '30px' }}/>
                {user && user.username}
              </div>
              {showProfileDropdown && (
                <div className='position-absolute top-100 start-0 bg-white p-1 shadow rounded'>
                  <p onClick={handleLogout} className='whitespace-nowrap cursor-pointer fs-6'>Logout</p>
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
    </>
  );
}