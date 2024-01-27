import _ from 'lodash';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import axios from '../../config/axios';
function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [agree, setAgree] = useState(false);
    const [formErrors,setFormErrors] = useState({})
    const [serverErrors,setServerErrors] = useState([])

    const errors = {}
    const navigate = useNavigate()
    function runValidator(){
        if(username.trim().length===0){
            errors.username = 'username is required'
        }
        if(email.trim().length===0){
            errors.email = 'email is required'
        }else if(!isEmail(email)){
            errors.email = 'invalid email format'
        }
        if(password.trim().length===0){
            errors.password = 'password is required'
        }else if(password.trim().length < 8 || password.trim().length >128){
            errors.password = 'password length must be between 8-128 characters'
        }
        if((selectedOption !=='restaurantOwner') && (selectedOption !== 'guest')){
            errors.selectedOption = 'please select a option as guest or restaurantOwner'
        }
        if(agree == false){
            errors.agree = 'please tick the terms andd conditions'
        }
        if(mobile.trim().length===0){
            errors.mobile = 'mobile is required'
        }else if(mobile.trim().length>10||mobile.trim().length<10){
            errors.mobile = 'length must be 10 characters'

        }
    }

   async function handleSubmit(e) {
        e.preventDefault();
        runValidator()
        if(!_.isEmpty(errors)){
            console.log(errors);
            setFormErrors(errors)

        }else{
            console.log('no errors found');
            const formData = {
                username,
                email,mobile,password,mobile,role:selectedOption
            }
            try{
               const response = await axios.post('/api/register',formData)
               console.log(response.data);
               setServerErrors([])
               navigate('/login')

                

            }catch(e){
                console.log(e);
                setFormErrors({})
                setServerErrors(e.response.data.errors)
                

            }

        }
        // Add your form submission logic here
    }
    // function handleTerms(){
    //     navigate('/terms')

    // }
    // function handleSignIn(){
    //     navigate('/signin')
    // }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">SignUp </h2>
           {/* {console.log(serverErrors)}  */}
           {!_.isEmpty(serverErrors)&&
           <ul>
            {
                serverErrors.map((ele)=>{
                    return <li style={{color:'red'}}>{ele.msg}</li>
                })
            }
           </ul>
           }
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor='username' className="col-2 col-form-label">Enter Name</label>
                    <div className="col-3">
                        <input
                            type="text"
                            value={username}
                            className="form-control"
                            id="username"
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                        {formErrors.username && <span style={{ color: 'red' }}>{formErrors.username}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor='email' className="col-2 col-form-label">Enter Email</label>
                    <div className="col-3">
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            id="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor='mobile' className="col-2 col-form-label">Enter Mobile</label>
                    <div className="col-3">
                        <input
                            type="number"
                            value={mobile}
                            className="form-control"
                            id="mobile"
                            onChange={(e) => { setMobile(e.target.value) }}
                        />
                        {formErrors.mobile && <span style={{ color: 'red' }}>{formErrors.mobile}</span>}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor='password' className="col-2 col-form-label">Enter Password</label>
                    <div className="col-3">
                        <input
                            type="password"
                            value={password}
                            className="form-control"
                            id="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                    </div>
                </div>
                <div className="mb-3 form-check">
                <label className="form-check-label" htmlFor='guest'>
                    <input 
                        type="radio"
                        value='guest'
                        id='guest'
                        className="form-check-input"
                        checked={selectedOption === 'guest'}
                        onChange={(e) => { setSelectedOption(e.target.value) }}
                    />

                    Guest</label>
             
                <label className="form-check-label" htmlFor='owner' style={{marginLeft:'40px'}}>
                    <input 
                        type="radio"
                        id='owner'
                        value='restaurantOwner'
                        className="form-check-input"
                        checked={selectedOption === 'restaurantOwner'}
                        onChange={(e) => { setSelectedOption(e.target.value) }}
                    />
                    Owned a Restaurant</label>
                    <p>{formErrors.selectedOption && <span style={{ color: 'red' }}>{formErrors.selectedOption}</span>}</p>
                </div>
                <div className="mb-3 form-check">
                <label htmlFor="agree"  className="form-check-label">
                    <input 
                        type="checkbox"
                        checked={agree}
                        className="form-check-input"
                        id='agree'
                        onChange={(e) => { setAgree(e.target.checked) }}
                        />
                    
             I agree to <Link to='/terms' >Terms and Conditions</Link>
            
                    </label>
                    <p>{formErrors.agree && <span style={{ color: 'red' }}>{formErrors.agree}</span>}</p>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className="mt-3">Already have an account? <Link to='/login' >Sign in</Link></p>
        </div>
    );
}

export default Registration;
