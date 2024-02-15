import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../config/axios';
import { restaurantRegistration } from '../../../services/restaurantService';
import './registerForm.css';

export default function Home() {
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState({
        gstIn: '',
        description: ''
    });
    const [fssai,setFssai] = useState(null)
    const [selectedFile,setSelectedFile] = useState(null)
    const [name, setName] = useState('')
    const [eLoc, setELoc] = useState({});
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [lattitude, setlattitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [timings, setTimings] = useState([]);
    const [formErrors,setFormErrors] = useState({})
    const errors = {}
    let restaurantId
    function runValidator(){
        if(name.trim().length===0){
            errors.name = 'name is required'
        }
        if(street.trim().length ===0){
            errors.street = 'street is required'
        }
        if(area.trim().length === 0 ){
            errors.area = 'area is required'
        }
        if(city.trim().length ===0 ){
            errors.city = 'city is required'
        }
        if(state.trim().length === 0 ){
            errors.state = 'state is required'
        }
        if(pincode.trim().length === 0){
            errors.pincode = 'pincode is required'
        }
        if(restaurant.description.trim().length === 0){
           
            errors.description = 'description is required'
        }
        if(restaurant.gstIn.trim().length === 0){
            errors.gstIn = 'gstIn is required'
        }
        if(timings.length == 0){
            errors.timings = 'timings is required'
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidator()
        console.log(errors);
        if(Object.keys(errors).length == 0){


            // Create a new FormData object
            const formData = new FormData();
        
            // Append text fields to FormData
            formData.append('name', eLoc.name);
            formData.append('description', restaurant.description);
            formData.append('gstNo', restaurant.gstIn);
            formData.append('geo[lat]', lattitude);
            formData.append('geo[lon]', longitude);
            
            // Append file fields to FormData
            if (fssai) {
                formData.append('licenseNumber', fssai);
            }
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
        
            // Append address details
            formData.append('address[street]', street);
            formData.append('address[area]', area);
            formData.append('address[city]', city);
            formData.append('address[state]', state);
            formData.append('address[pincode]', pincode);
        
            // Append timings data
            timings.forEach((timing, index) => {
                formData.append(`timings[${index}][dayOfWeek]`, timing.dayOfWeek);
                formData.append(`timings[${index}][openingTime]`, timing.openingTime);
                formData.append(`timings[${index}][closingTime]`, timing.closingTime);
            });
        
            // Send the form data to the backend
            const token = localStorage.getItem('token');
            const data = await restaurantRegistration(formData,token)
           
                
                console.log(data);
                restaurantId = data._id
                if(data.status == 'approved'){
                    navigate(`/restaurant/${restaurantId}`)
    
                }else{
                    navigate('/register/thankyou')
                }
                
                
           
            // Clear form fields after successful submission
            setRestaurant({
                gstIn: '',
                description: ''
            });
            setFssai('');
            setSelectedFile('');
            setName('');
            setELoc({});
            setAddress('');
            setStreet('');
            setArea('');
            setCity('');
            setState('');
            setPincode('');
            setlattitude('');
            setlongitude('');
            setTimings([]);
            setFormErrors({})
            //navigate(`/restaurant/${restaurantId}`)
            
        }else{
            setFormErrors(errors)
        }
        
    }
    

    function handleChange(e) {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {

        const file = e.target.files[0];
        setFssai(file);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
    
    }

    async function handleAddress() {
        console.log(address);
        try {
            const response = await axiosInstance.get('/api/search', {
                params: {
                    id: address
                }
            })
            console.log('axios request sent successfully');
            console.log(response.data)
            setELoc(response.data);
            setStreet(response.data.address[0] + ' ' + response.data.address[1]);
            setArea(response.data.address[response.data.address.length - 4]);
            setCity(response.data.address[response.data.address.length - 3]);
            setState(response.data.address[response.data.address.length - 2]);
            setPincode(response.data.address[response.data.address.length - 1])
            setName(response.data.name)
            console.log(response.data.location)
            const coOrdinates = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${response.data.location}&apiKey=33d50629c8e14322a3abd6fdc6e5b824`)
            const lattitude = coOrdinates.data.features[0].geometry.coordinates[1]
            console.log(lattitude);
            const longitude = coOrdinates.data.features[0].geometry.coordinates[0]
            console.log(longitude);
            setlattitude(lattitude);
            setlongitude(longitude);
            setAddress('');
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    }

    // Function to add a new timing entry
    const addTiming = () => {
        setTimings([...timings, { dayOfWeek: '', openingTime: '', closingTime: '' }]);
    };

    // Function to handle changes in timing data
    const handleTimingChange = (index, field, value) => {
        const updatedTimings = [...timings];
        updatedTimings[index][field] = value;
        setTimings(updatedTimings);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4" style={{ maxWidth: '800px' }}>
                <h2 className="mb-4 text-center">Restaurant Registration Form</h2>
                <input
                    type='text'
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                    placeholder="search your address"
                />
                <button onClick={handleAddress}>Search</button>
                <form onSubmit={handleSubmit} className="row gx-4" >
                    <fieldset className="col-md-6">
                        <legend>Restaurant Details</legend>
                        <div className="mb-3">
                            <label htmlFor="restaurantName" className="form-label"> Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e)=>{setName(eLoc.name)}}
                                
                                id='restaurantName'
                            />
                            
                        {formErrors.name&&<span style={{color:'red'}}>{formErrors.name}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gstIn" className="form-label">Enter GSTIN</label>
                            <input
                                type="text"
                                className="form-control"
                                value={restaurant.gstIn}
                                onChange={handleChange}
                                name='gstIn'
                                id='gstIn'
                                
                            />
                     {formErrors.gstIn&&<span style={{color:'red'}}>{formErrors.gstIn}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="fssai" className="form-label">FSSAI License</label>
                            <input
                                type="file"
                                accept="image/*"
                                encType="multipart/form-data"
                                className="form-control"
                                name="fssai"
                                id="fssai"

                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                encType="multipart/form-data"
                                name="image"
                                id="image"

                                onChange={handleImageChange}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="col-md-6">
                        <legend>Address Details</legend>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                value={street}
                                readOnly
                                name='street'
                                id='street'
                            />
                         {formErrors.street&&<span style={{color:'red'}}>{formErrors.street}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="area" className="form-label">Area</label>
                            <input
                                type="text"
                                className="form-control"
                                value={area}
                                readOnly
                                name='area'
                                id='area'
                            />
                    {formErrors.area&&<span style={{color:'red'}}>{formErrors.area}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                className="form-control"
                                value={city}
                                readOnly
                                id='city'
                            />
                         {formErrors.city&&<span style={{color:'red'}}>{formErrors.city}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                id="state"
                                readOnly
                                name="state"
                            />
                         {formErrors.state&&<span style={{color:'red'}}>{formErrors.state}</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Enter Pincode</label>
                            <input
                                type="number"
                                className="form-control"
                                value={pincode}
                                readOnly
                                id="pincode"
                            />
                         {formErrors.pincode&&<span style={{color:'red'}}>{formErrors.pincode}</span>}
                        </div>
                    </fieldset>
                    {/* Timing Details */}
<fieldset className="col-md-12">
    <legend>Timing Details</legend>
    {timings.map((timing, index) => (
        <div key={index} className="timing-entry">
            <label htmlFor={`dayOfWeek_${index}`}>Day of Week:</label>
            <select
                id={`dayOfWeek_${index}`}
                value={timing.dayOfWeek}
                onChange={(e) => handleTimingChange(index, 'dayOfWeek', e.target.value)}
                required
            >
                <option value="">Select Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>

            <label htmlFor={`openingTime_${index}`}>Opening Time:</label>
            <input
                type="time"
                id={`openingTime_${index}`}
                value={timing.openingTime}
                onChange={(e) => handleTimingChange(index, 'openingTime', e.target.value)}
                required
            />

            <label htmlFor={`closingTime_${index}`}>Closing Time:</label>
            <input
                type="time"
                id={`closingTime_${index}`}
                value={timing.closingTime}
                onChange={(e) => handleTimingChange(index, 'closingTime', e.target.value)}
                required
            />
        </div>

    ))}

    <button type="button" onClick={addTiming}>Add Timing</button><br/>
 {formErrors.timings&&<span style={{color:'red'}}>{formErrors.timings}</span>}
</fieldset>

                    <fieldset className="col-md-12">
                        <legend>Other Details</legend>
                        <div className="mb-3">
                            <label htmlFor='description' className="form-label">Description</label>
                            <textarea
                                className="form-control col"
                                id="description"
                                style={{ height: '100px' }} // Adjust the height as needed
                                value={restaurant.description}
                                onChange={handleChange}
                                name="description"
                                placeholder="Enter description"
                            />
                     {formErrors.description&&<span style={{color:'red'}}>{formErrors.description}</span>}

                        </div>
                    </fieldset>

                    {/* Timing Details */}
                    {/* // Inside the return statement of the Home component */}




                    <div className="col-12 mt-3">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}


