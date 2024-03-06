import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurantContext from "../../../contextApi/restaurantContext";
import { updateRestaurant } from "../../../services/restaurantService";
import './UpdateRestaurant.css'

export default function UpdateRestaurant() {
    const { restaurantState } = useContext(restaurantContext);
    const resId = restaurantState.restaurantOwner._id;
    const { address, name, description, gstNo, timings } = restaurantState.restaurantOwner;
    const navigate = useNavigate();

    const [timingsData, setTimingsData] = useState(timings || []);
    const [restaurant, setRestaurant] = useState({
        name: name || '',
        gstIn: gstNo || '',
        description: description || ''
    });
    const [addressDetails, setAddressDetails] = useState({
        street: address.street || '',
        area: address.area || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: restaurant.name,
            description: restaurant.description,
            timings: timingsData
        };
        const token = localStorage.getItem('token');
        const data = await updateRestaurant(resId, formData, token);
        console.log(data, 'updated restaurant');
        // Your submission logic here...
    };

    const handleTimingChange = (index, field, value) => {
        const updatedTimings = [...timingsData];
        updatedTimings[index][field] = value;
        setTimingsData(updatedTimings);
    };

    const addTiming = () => {
        setTimingsData([...timingsData, { dayOfWeek: '', openingTime: '', closingTime: '' }]);
    };

    const removeTiming = (index) => {
        const updatedTimings = [...timingsData];
        updatedTimings.splice(index, 1);
        setTimingsData(updatedTimings);
    };

    const handleChangeRestaurant = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleChangeAddress = (e) => {
        setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
    };

    const goToField = (fieldName) => {
        document.getElementById(fieldName).focus();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} style={{ border: '2px solid white', padding: '20px', borderRadius: '10px', backgroundColor: '#F8F9FA' }}>
                        <h3>Restaurant Details</h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={restaurant.name}
                                onChange={handleChangeRestaurant}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gstIn" className="form-label"><strong>GSTIN</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="gstIn"
                                name="gstIn"
                                value={restaurant.gstIn}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={restaurant.description}
                                onChange={handleChangeRestaurant}
                            ></textarea>
                        </div>
                        <h3>Timing Details</h3>
                        {timingsData.map((timing, index) => (
                            <div key={index} className="mb-3">
                                <label><strong>Timing {index + 1}</strong></label>
                                <div className="row g-3">
                                    <div className="col">
                                        <label className="form-label">Day of Week</label>
                                        <input
                                            type="text"
                                            value={timing.dayOfWeek}
                                            onChange={(e) => handleTimingChange(index, 'dayOfWeek', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Opening Time</label>
                                        <input
                                            type="text"
                                            value={timing.openingTime}
                                            onChange={(e) => handleTimingChange(index, 'openingTime', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Closing Time</label>
                                        <input
                                            type="text"
                                            value={timing.closingTime}
                                            onChange={(e) => handleTimingChange(index, 'closingTime', e.target.value)}
                                            className="form-control"
                                            id={`closingTime_${index}`} // Added id for targeting
                                        />
                                    </div>
                                    <div className="col-auto align-self-end mt-3"> {/* Added mt-3 class for margin-top */}
                                        <button type="button" className="btn btn-danger" onClick={() => removeTiming(index)}>Remove Timing</button>
                                    </div>
                                </div>
                            </div>

                        ))}
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={addTiming} className="btn btn-success">Add Timing</button>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Update Restaurant</button> {/* Moved "Update Restaurant" button outside the flex container */}
                    </form>
                </div>
                <div className="col-md-6" style={{ border: '2px solid white', padding: '20px', borderRadius: '10px', backgroundColor: '#F8F9FA' }}>
                    <h3>Address Details</h3>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label"><strong>Street</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={address.street}
                            readOnly
                            disabled
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label"><strong>Area</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="area"
                            name="area"
                            value={address.area}
                            readOnly
                            disabled
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label"><strong>City</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={address.city}
                            readOnly
                            disabled
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label"><strong>State</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={address.state}
                            readOnly
                            disabled
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pincode" className="form-label"><strong>Pincode</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            id="pincode"
                            name="pincode"
                            value={address.pincode}
                            readOnly
                            disabled
                            onChange={handleChangeAddress}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}