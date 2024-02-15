//import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import axios from '../../config/axios';



function ForgotPassword() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    formErrors: {},
    serverErrors: []
  });

  const errors = {};

  function runValidator() {
    if (_.isEmpty(user.email.trim())) {
      errors.email = 'Email is required';
    } else if (!isEmail(user.email)) {
      errors.email = 'Invalid email';
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
        const formData = _.pick(user, 'email');
        const response = await axios.post('/api/user/forgotPassword', formData);
        console.log('worked');
        console.log(response.data.status);
        if(response.data.status == 'Email sent successfully'){
            navigate('/login')
        }
 
            //console.log(token);
            
     
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

 

  return (
    <div className="container mt-5">
      <h2>ForgotPassword</h2>
      {/* {console.log(user.serverErrors)} */}
      {/* {user.serverErrors&&(<>
        <ul>
            {
                user.serverErrors.map((ele)=>{
                    return <li key={uuidv4() } style={{color:'red'}}>{ele.msg}</li>
                })
            }
        </ul>
      </>)} */}
      <form onSubmit={handleSubmit} className="g-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter your Email
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
          <p>
            <Link to="/login">Back to SignIn</Link>
          </p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
     
    </div>
  );
}

export default ForgotPassword