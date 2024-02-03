import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../config/axios';
import './Home.css';

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
    let restaurantId;

    async function handleSubmit(e) {
        e.preventDefault();
        
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
        try {
            const response = await axios.post('/api/restaurantRegister', formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data' // Important for file uploads
                }
            });
            console.log(response.data);
            restaurantId = response.data._id
            if(response.data.status == 'approved'){
                navigate(`/restaurant/${restaurantId}`)

            }else{
                navigate('/register/thankyou')
            }
            
            
        } catch (e) {
            console.log('err', e);
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
        //navigate(`/restaurant/${restaurantId}`)
        
    }
    

    function handleChange(e) {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        // Handle file input change
        const file = e.target.files[0];
        setFssai(file);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        // Handle image change
    }

    async function handleAddress() {
        console.log(address);
        try {
            const response = await axios.get('/api/search', {
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                className="form-control"
                                value={city}
                                readOnly
                                id='city'
                            />
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
    <button type="button" onClick={addTiming}>Add Timing</button>
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



// import React, { useState } from "react";
// import axios from '../../config/axios';

// export default function Home() {
//     const [restaurant, setRestaurant] = useState({
//         gstIn: '',
//         fssai: null,
//         selectedFile: null,
//         description: ''
//     });
//     const [name,setName] = useState('')
//     const [eLoc, seteLoc] = useState({});
//     const [address, setAddress] = useState('');
//     const [street, setStreet] = useState('');
//     const [area, setArea] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [lattitude,setLattitude] = useState('')
//     const [longitude,setlongitude] = useState('')
 
//     function handleSubmit(e) {
//         e.preventDefault();
//         const formData = {
//             name: eLoc.name,
//             address: {
//                 street: street,
//                 area: area,
//                 city: city,
//                 state: state,
//                 pincode: pincode
//             },
//             description: restaurant.description,
//             gstNo: restaurant.gstIn,
//             geo:{
//                 lat:lattitude,
//                 lon:longitude
//             }
//         }
//         console.log(formData);
//         // Handle form submission
//     }

//     function handleChange(e) {
//         setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
//     }

//     function handleFileChange(e) {
//         // Handle file input change
//     }

//     function handleImageChange(e) {
//         // Handle image change
//     }

//     async function handleAddress() {
//         console.log(address);
//         try {
//             const response = await axios.get('/api/search', {
//                 params: {
//                     id: address
//                 }
//             })
//             console.log('axios request sent successfully');
//             console.log(response.data)
//             seteLoc(response.data);
//             setStreet(response.data.address[0] + ' ' + response.data.address[1]);
//             setArea(response.data.address[response.data.address.length - 4]);
//             setCity(response.data.address[response.data.address.length - 3]);
//             setState(response.data.address[response.data.address.length - 2]);
//             setPincode(response.data.address[response.data.address.length - 1])
//             setName(response.data.name)
//             console.log(response.data.location)
//             const coOrdinates = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${response.data.location}&apiKey=33d50629c8e14322a3abd6fdc6e5b824`)
//             const lattitude = coOrdinates.data.features[0].geometry.coordinates[0]
        
//             setLattitude(lattitude)
//             const longitude = coOrdinates.data.features[0].geometry.coordinates[1]
//                 setlongitude(longitude)
//                 setAddress('')
//         } catch (error) {
//             console.error('Error fetching geocoding data:', error);
//         }
//     }

//     return (
//         <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//             <div className="card p-4" style={{ maxWidth: '800px' }}>
//                 <h2 className="mb-4 text-center">Restaurant Registration Form</h2>
//                 <input 
//                     type='text'
//                     value={address}
//                     onChange={(e)=>{setAddress(e.target.value)}}
//                 />
//                 <button onClick={handleAddress}>Search</button>
//                 <form onSubmit={handleSubmit} className="row gx-4" >
//                     <fieldset className="col-md-6">
//                         <legend>Restaurant Details</legend>
//                         <div className="mb-3">
//                             <label htmlFor="restaurantName" className="form-label"> Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={eLoc.name}
//                                 readOnly
//                                 name='restaurantName'
//                                 id='restaurantName'
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="gstIn" className="form-label">Enter GSTIN</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={restaurant.gstIn}
//                                 onChange={handleChange}
//                                 name='gstIn'
//                                 id='gstIn'
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="fssai" className="form-label">FSSAI License</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 name="fssai"
//                                 id="fssai"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="image" className="form-label">Image</label>
//                             <input
//                                 type="file"
//                                 className="form-control"
//                                 name="image"
//                                 id="image"
//                                 onChange={handleImageChange}
//                             />
//                         </div>
//                     </fieldset>

//                     <fieldset className="col-md-6">
//                         <legend>Address Details</legend>
//                         <div className="mb-3">
//                             <label htmlFor="street" className="form-label">Street</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={street}
//                                 readOnly
//                                 name='street'
//                                 id='street'
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="area" className="form-label">Area</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={area}
//                                 readOnly
//                                 name='area'
//                                 id='area'
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="city" className="form-label">City</label>
//                             <input
//                                 className="form-control"
//                                 value={city}
//                                 readOnly
//                                 id='city'
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="state" className="form-label">State</label>
//                             <input
//                                 className="form-control"
//                                 value={state}
//                                 onChange={(e) => setState(e.target.value)}
//                                 id="state"
//                                 readOnly
//                                 name="state"
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="pincode" className="form-label">Enter Pincode</label>
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 value={pincode}
//                                 readOnly
//                                 id="pincode"
//                             />
//                         </div>
//                     </fieldset>

//                     <fieldset className="col-md-6">
//                         <legend>Other Details</legend>
//                         <div className="mb-3">
//                             <label htmlFor='description' className="form-label">Description</label>
//                             <textarea 
//                                 className="form-control col" 
//                                 id="description" 
//                                 style={{ height: '100px' }} // Adjust the height as needed
//                                 value={restaurant.description} 
//                                 onChange={handleChange} 
//                                 name="description" 
//                                 placeholder="Enter description"
//                             />
//                         </div>
//                     </fieldset>

//                     <div className="col-12 mt-3">
//                         <input
//                             type="submit"
//                             className="btn btn-primary"
//                             value="Submit"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }











// // //import axios from 'axios';
// // import { useState } from "react";
// // import axios from '../../config/axios';

// // export default function Home() {
// //     const [restaurant, setRestaurant] = useState({
      
// //         gstIn: '',
// //         fssai: null,
// //         selectedFile: null,
// //         description:'',
// //         street:'',
// //         area:'',
// //         city:'',
// //         state:'',
// //         pincode:''
// //     });
// //     const [eLoc,seteLoc] = useState({})
// //     const [address,setAddress] = useState('')
// //     const [state, setState] = useState('');
// //     const [city, setcity] = useState('');
// //     const [county, setCounty] = useState('');
// //     const [district, setDistrict] = useState('');
// //     //console.log(eLoc);
// //     const [pincode, setPincode] = useState('');
// //     //const [pincode, setPincode] = useState(eLoc.address?.[eLoc.address.length - 1] || '');
// //     const pincode2 =eLoc.address[eLoc.address.length - 1]
    
    
// //     function handleSubmit(e) {
// //         e.preventDefault();
// //         const formData = {
// //             name:restaurant.restaurantName,
// //             address:{
// //                 street:restaurant.street,
// //                 area:restaurant.area,
// //                 city:county,
// //                 state:state,
// //                 pincode:pincode

// //             },
// //             description:restaurant.description,
// //             gstNo:restaurant.gstIn,
            
// //         }
        
// //         // Handle form submission
// //     }

// //     function handleChange(e) {
// //         setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
// //     }
    
// //     function handleFileChange(e) {
// //         // Handle file input change
// //     }
// //     function handleImageChange(e){
// //         //Handle image Change
// //     }
    
// //     function handleUpload() {
// //         // Handle file upload
// //     }
    
// //     async function handleAddress() {
// //         console.log(address);
// //         try{
// //             const response = await axios.get('/api/search',{
// //                 params:{
// //                     id:address
// //                 }
// //             })
// //             console.log('axios request sent successfully');
// //             console.log(response.data)
// //             seteLoc(response.data)
// //             //setPincode(eLoc.address[eLoc.address.length - 1])
// //             //setPincode(eLoc.address[eLoc.address.length - 1])
// //             // console.log(eLoc.address[eLoc.address.length - 2])
// //             // console.log(eLoc.address[eLoc.address.length - 1])
// //             // console.log(eLoc.address[eLoc.address.length - 3])
// //             // console.log(eLoc.address[0],eLoc.address[1])
// //             // console.log(eLoc.address[2])
// //             // console.log(eLoc.address[eLoc.address.length - 3])
            
// //         } catch (error) {
// //             console.error('Error fetching geocoding data:', error);
// //         }
// //     }
// //     console.log(pincode);
// //     // useEffect(() => {
// //     //     if (!Object.keys(eLoc).length==0) {
// //     //         setRestaurant({...restaurant,street:eLoc.address[0] + eLoc.address[1]} )// Set pincode from eLoc
// //     //         console.log(eLoc.address[2])
            
// //     //         setRestaurant({...restaurant,area:eLoc.address[2] } )// Set pincode from eLoc
// //     //         setRestaurant({...restaurant,city:eLoc.address[eLoc.address.length - 3]} )// Set pincode from eLoc
// //     //         setRestaurant({...restaurant,state:eLoc.address[eLoc.address.length - 2]} )// Set pincode from eLoc
// //     //         setRestaurant({...restaurant,pincode:eLoc.address[eLoc.address.length - 1]} )// Set pincode from eLoc
// //     //        // setState(eLoc.address[eLoc.address.length - 2] )// Set pincode from eLoc
// //     //        // setCity(eLoc.address[eLoc.address.length - 3] )// Set pincode from eLoc
// //     //        // setArea(eLoc.address[0],eLoc.address[1] )// Set pincode from eLoc
// //     //        //setStreet(eLoc.address[2])// Set pincode from eLoc
// //     //        console.log(restaurant)
// //     //     }
// //     // }, [restaurant]);




// //     return (
// //         <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
// //             <div className="card p-4" style={{ maxWidth: '800px' }}>
// //                 <h2 className="mb-4 text-center">Restaurant Registration Form</h2>
// //                 <input 
// //                             type='text'
// //                             value={address}
// //                             onChange={(e)=>{setAddress(e.target.value)}}
// //                             />
// //                         <button onClick={handleAddress}>Search</button>
                     
// //                 <form onSubmit={handleSubmit} className="row gx-4">
// //                     <fieldset className="col-md-6">
// //                         <legend>Restaurant Details</legend>
// //                         <div className="mb-3">
// //                             <label htmlFor="restaurantName" className="form-label"> Name</label>
// //                             <input
// //                                 type="text"
// //                                 className="form-control"
// //                                 value={eLoc.name}
// //                                 readOnly
// //                                 id='restaurantName'
// //                                 />
// //                         </div>
// //                         <div className="mb-3">
// //                             <label htmlFor="gstIn" className="form-label">Enter GSTIN</label>
// //                             <input
// //                                 type="text"
// //                                 className="form-control"
// //                                 value={restaurant.gstIn}
// //                                 onChange={handleChange}
// //                                 name='gstIn'
// //                                 id='gstIn'
// //                             />
// //                         </div>
// //                         <div className="mb-3">
// //                             <label htmlFor="fssai" className="form-label">FSSAI License</label>
// //                             <input
// //                                 type="file"
// //                                 className="form-control"
// //                                 name="fssai"
// //                                 id="fssai"
// //                                 onChange={handleFileChange}
// //                                 />
// //                         </div>
// //                         <div className="mb-3">
// //             <label htmlFor="image" className="form-label">Image</label>
// //             <input
// //                 type="file"
// //                 className="form-control"
// //                 name="image"
// //                 id="image"
// //                 onChange={handleImageChange}
// //                 />
// //              </div>
// //                     </fieldset>

// //                     <fieldset className="col-md-6">
// //                         <legend>Address Details</legend>
                       
                     
// //                         <div className="mb-3">
// //                             <label htmlFor="street" className="form-label">Street</label>
// //                             <input
// //                                 type="text"
// //                                 className="form-control"
// //                                 value={restaurant.street}
// //                                 onChange={handleChange}
// //                                 name='street'
// //                                 id='street'
// //                             />
// //                         </div>
// //                         <div className="mb-3">
// //                             <label htmlFor="area" className="form-label">Area</label>
// //                             <input
// //                                 type="text"
// //                                 className="form-control"
// //                                 value={restaurant.area}
// //                                 onChange={handleChange}
// //                                 name='area'
// //                                 id='area'
// //                                 />
// //                         </div>
// //                         <div className="mb-3">
// //                             <label htmlFor="city" className="form-label">City</label>
// //                             <input
// //                                 className="form-control"
// //                                 value={restaurant.city}
// //                                 id='county'
// //                                 onChange={(e)=>{handleChange(e)}}
// //                                 />
// //                         </div>
                  
// //                         <div className="mb-3">
// //                             <label htmlFor="state" className="form-label">State</label>
// //                             <input
// //                                 className="form-control"
// //                                 value={restaurant.state}
// //                                 id="state"
// //                                 name="state"
// //                                 onChange={(e)=>{handleChange(e)}}
// //                             />
// //                         </div>
// //                         <div className="mb-3">
// //                             <label htmlFor="pincode" className="form-label">Enter Pincode</label>
// //                             <input
// //                                 type="number"
// //                                 className="form-control"
// //                                 value={pincode2}
// //                                 readOnly
                                
// //                                 id="pincode"
                                
// //                                 />
// //                         </div>
                   
// //                     </fieldset>
// //                     <fieldset className="col-md-6">
// //     <legend>Other Details</legend>
// //     <div className="mb-3">
// //         <label htmlFor='description' className="form-label">Description</label>
// //         <textarea 
// //             className="form-control col" 
// //             id="description" 
// //             style={{ height: '100px' }} // Adjust the height as needed
// //             value={restaurant.description} 
// //             onChange={handleChange} 
// //             name="description" 
// //             placeholder="Enter description"
            
// //             />
// //     </div>

// // </fieldset>


// //                     <div className="col-12 mt-3">
// //                         <input
// //                             type="submit"
// //                             className="btn btn-primary"
// //                             value="Submit"
// //                             />
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //             // {
// //             //     eLoc &&
            
// //             // }
// //     );
// // }

// // // useEffect(() => {
// //         //     if (pincode) {
// //             //         axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&citycode=IN&key=0507c5bf85f34c82b85064dd9b0a019a`)
// //         //             .then((response) => {
// //             //                 console.log(response.data);
// //         //                 const data = response.data;
// //         //                 setState(data.results[0].components.state);
// //         //                 setcity(data.results[0].components.city);
               
// //         //                 const suburb = data.results[0].components.suburb;
// //         //                 const countyValue = suburb ? `${suburb}, ${data.results[0].components.county}` : data.results[0].components.county;
// //         //                 setCounty(countyValue);
    
// //         //                 const cityDistrict = data.results[0].components.city_district;
// //         //                 const districtValue = cityDistrict ? `${cityDistrict}, ${data.results[0].components.state_district}` : data.results[0].components.state_district;
// //         //                 setDistrict(districtValue);
// //         //             })
// //         //             .catch((error) => {
// //         //                 console.log(error);
// //         //             });
// //         //     }
// //         // }, [pincode]);