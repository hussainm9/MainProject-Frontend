import React from 'react'
import swal from 'sweetalert'
import _ from 'lodash';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css'
import isEmail from 'validator/lib/isEmail';
import axios from '../../config/axios';
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'

function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [agree, setAgree] = useState(false);
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    const [uCase, setUCase] = useState(false)
    const [num, setNum] = useState(false)
    const [sChar, setSChar] = useState(false)
    const [length, setLength] = useState(false)
    const [ispasswordFocus, setIsPasswordFocus] = useState(false)
    const timesIcon = <FaTimes color='red' size={15} />
    const checkIcon = <BsCheck2All color='green' size={15} />


    useEffect(() => {
        const newpassword = String(password)
        if (newpassword.match(/([a-z]*[A-Z])|([A-Z]*[a-z])/)) {
            setUCase(true)
        } else {
            setUCase(false)
        }
        if (newpassword.match(/([0-9])/)) {
            setNum(true)
        } else {
            setNum(false)
        }
        if (newpassword.match(/([!,@,#,$,%,^,&,*])/)) {
            setSChar(true)
        } else {
            setSChar(false)
        }
        if (newpassword.length > 7) {
            setLength(true)
        } else {
            setLength(false)
        }
    }, [password])

    const switchIcon = (conditon) => {
        if (conditon) {
            return checkIcon
        } else {
            return timesIcon
        }
    }

    const errors = {}
    const navigate = useNavigate()
    function runValidator() {
        if (username.trim().length === 0) {
            errors.username = 'username is required'
        }
        if (email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!isEmail(email)) {
            errors.email = 'invalid email format'
        }
        if (password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password length must be between 8-128 characters'
        }
        if ((selectedOption !== 'restaurantOwner') && (selectedOption !== 'guest')) {
            errors.selectedOption = 'please select a option as guest or restaurantOwner'
        }
        if (agree === false) {
            errors.agree = 'please tick the terms andd conditions'
        }
        if (mobile.trim().length === 0) {
            errors.mobile = 'mobile is required'
        } else if (mobile.trim().length > 10 || mobile.trim().length < 10) {
            errors.mobile = 'length must be 10 characters'

        }
    };

    const handlePasswordFocus = () => {
        setIsPasswordFocus(true)
    }
    const handlePasswordBlur = () => {
        setIsPasswordFocus(false)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidator()
        if (!_.isEmpty(errors)) {
            console.log(errors);
            setFormErrors(errors)

        } else {
            console.log('no errors found');
            const formData = {
                username,
                email, mobile, password, role: selectedOption
            }
            try {
                const response = await axios.post('/api/register', formData)
                console.log(response.data);
                swal("Success", `Welcome ${formData.username}`, "success")
                setServerErrors([])
                navigate('/login')
            } catch (e) {
                console.log(e);
                setFormErrors({})
                swal("error", "Registration failure", "error")
                setServerErrors(e.response.data.errors)


            }

        }

    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <Container>

                <div className="card p-4" style={{ maxWidth: '500px' }}>
                    <h2 className="mb-4 ">SignUp </h2>

                    {!_.isEmpty(serverErrors) &&
                        <ul>
                            {
                                serverErrors.map((ele) => {
                                    return <li style={{ color: 'red' }}>{ele.msg}</li>
                                })
                            }
                        </ul>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row ">
                            <label htmlFor='username' className="col-4 col-form-label">Enter Name</label>
                            <div className="col-8">
                                <input
                                    type="text"
                                    name='name'
                                    value={username}
                                    className="form-control"
                                    id="username"
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                                {formErrors.username && <span style={{ color: 'red' }}>{formErrors.username}</span>}
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor='email' className="col-4 col-form-label">Enter Email</label>
                            <div className="col-8">
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
                            <label htmlFor='mobile' className="col-4 col-form-label">Enter Mobile</label>
                            <div className="col-8">
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
                            <label htmlFor='password' className="col-4 col-form-label">Enter Password</label>
                            <div className="col-8">
                                <input
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur}
                                />
                                {/* {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>} */}
                                {ispasswordFocus && (
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <ul className="list-unstyled mb-0">
                                                <li>
                                                    {switchIcon(uCase)} &nbsp; Atleast one lowercase & upercase letter
                                                </li>
                                                <li>
                                                    {switchIcon(num)} &nbsp; Atleast One number between (0-9)
                                                </li>
                                                <li>
                                                    {switchIcon(sChar)} &nbsp; Atleast One Special Char (!@#$%^&*)
                                                </li>
                                                <li>
                                                    {switchIcon(length)} &nbsp; Password length should be 8 characters
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

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

                            <label className="form-check-label" htmlFor='owner' style={{ marginLeft: '40px' }}>
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
                            <label htmlFor="agree" className="form-check-label">
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
                        <button type="submit" className="btn btn-primary"  >Submit</button>
                    </form>
                    <p className="mt-3">Already have an account? <Link to='/login' >Sign in</Link></p>
                </div>

            </Container>

        </div>
    );
}

export default Registration;