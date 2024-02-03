import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.css';
import './header.css';
import { BiSearch } from 'react-icons/bi';
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [role, setRole] = useState('')

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  console.log(token)



  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');

    navigate('/login');
  }

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
          <a className="navbar-brand" href="logo">
            <div className="row">
              <div className="col-md-2">
                <img height={50} src={logo} className="rounded float-left" alt="Logo" />
              </div>
            </div>
          </a>

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
                <a className="nav-link active" aria-current="page" href="about">About</a>
              </li>
              <li className="nav-item pe-5">
                <a className="nav-link active" aria-current="page" href="home">Home</a>
              </li>
              <li className="nav-item pe-3">
                {role === 'guest && restaurantOwner' || !token ? (
                  <li className="nav-item pe-3">
                    <a className="nav-link active" href="book">Book Table</a>
                  </li>
                ) : null}

              </li>

            </ul>

            {token ? (
              <div>
                <button onClick={handleLogout} className="btn btn-danger ms-2 btn-sm">
                  Logout
                </button>

              </div>
            ) : (
              <a href="/register" className="btn btn-primary ms-2 btn-sm" role="button">
                <span>Sign Up</span>
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
