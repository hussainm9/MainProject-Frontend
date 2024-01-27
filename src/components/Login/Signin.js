import { jwtDecode } from 'jwt-decode';
//import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import isEmail from 'validator/lib/isEmail';
import axios from '../../config/axios';
import './Signin.css';


function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    formErrors: {},
    serverErrors: [],
    showPassword: false,
  });

  const errors = {};

  function runValidator() {
    if (_.isEmpty(user.email.trim())) {
      errors.email = 'Email is required';
    } else if (!isEmail(user.email)) {
      errors.email = 'Invalid email';
    }

    if (_.isEmpty(user.password.trim())) {
      errors.password = 'Password is required';
    } else if (user.password.length < 8 || user.password.length > 128) {
      errors.password = 'Password should be between 8-128 characters';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    runValidator();
    if (!_.isEmpty(errors)) {
      console.log(errors);
      setUser({ ...user, formErrors: errors });
    } else {
      console.log('No errors found');
      try {
        const formData = _.pick(user, 'email', 'password');
        const response = await axios.post('/api/login', formData);
        const token = response.data.token
                    console.log(token);

        if(response && token){
            const tokenData = jwtDecode(token)
             console.log(tokenData);
             console.log(tokenData.role);
             if(tokenData.role=='restaurantOwner'){
              navigate('/restaurantHome')

             }else if(tokenData.role == 'admin'){
              navigate('/adminHome')
             }else if(tokenData.role == 'guest'){
              navigate('/guestHome')
             }
            //console.log(token);
            
            setUser({...user,serverErrors:[]})
        }else{
            console.log('error in response');
        }
      } catch (e) {
        console.log(e);
        setUser({...user,formErrors:{},serverErrors:e.response.data.errors})
      }
    }
    // Add your login logic here
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleCutCopyPaste(e) {
    if (e.target.name === 'password') {
      e.preventDefault();
    }
  }

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      {/* {console.log(user.serverErrors)} */}
      {user.serverErrors&&(<>
        <ul>
            {
                user.serverErrors.map((ele)=>{
                    return <li key={uuidv4() } style={{color:'red'}}>{ele.msg}</li>
                })
            }
        </ul>
      </>)}
      <form onSubmit={handleSubmit} className="g-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            name="email"
            id="email"
            className="form-control"
          />
        </div>
        {user.formErrors.email&&<span style={{color:'red'}}>{user.formErrors.email}</span>}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={user.showPassword ? 'text' : 'password'}
              value={user.password}
              onChange={(e) => handleChange(e)}
              onCopy={(e) => handleCutCopyPaste(e)}
              onCut={(e) => handleCutCopyPaste(e)}
              onPaste={(e) => handleCutCopyPaste(e)}
              name="password"
              id="password"
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setUser({ ...user, showPassword: !user.showPassword })}
            >
              {user.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        {user.formErrors.password&&<span style={{color:'red'}}>{user.formErrors.password}</span>}

        <div className="mb-3">
          <p>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-3">
        New User? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;