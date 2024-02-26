//import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { resetPassword } from '../../services/passwordService';




function ResetPassword() {
    const {id,token} = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    password: '',
    formErrors: {},
    serverErrors: [],
    showPassword:false
  });

  const errors = {};

  function runValidator() {
    if (_.isEmpty(user.password.trim())) {
      errors.password = 'password is required';
    } else if (user.password<8 || user.password>128) {
      errors.password = 'password must be 8-128 characters';
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
        const formData = _.pick(user, 'password');
        const data = await resetPassword(id,formData,token)
        console.log('worked');
        console.log(data.status);
        if(data.status == 'success'){
            alert('password changed successfully')
            //navigate('/login')
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
      <h2>ResetPassword</h2>
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
          <label htmlFor="password" className="form-label">
            Enter your Password
          </label>
          <input
            type= 'text'
            placeholder='enter password'
            value={user.password}
            onChange={(e) => handleChange(e)}
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        {user.formErrors.password&&<span style={{color:'red'}}>{user.formErrors.password}</span>}
      
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

export default ResetPassword