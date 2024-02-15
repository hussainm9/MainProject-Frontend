import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurantContext from "../../../contextApi/restaurantContext";
import { updateRestaurant } from "../../../services/restaurantService";
export default function UpdateRestaurant() {
    //const {restaurantState} = useContext(restaurantContext)
    const { restaurantState } = useContext(restaurantContext);
    console.log(restaurantState.restaurantOwner);
    const resId = restaurantState.restaurantOwner._id
    ;


    const {address,name,description,gstNo,timings} = restaurantState.restaurantOwner

    console.log(restaurantState.restaurantOwner,'update res');
    const navigate = useNavigate();
    const [timingsData, setTimingsData] = useState(timings || []);
    const [restaurant, setRestaurant] = useState({
        name:name|| '',
        gstIn:gstNo|| '',
        description:description|| ''
    });
    const [addressDetails, setAddressDetails] = useState({
        street: address.street||'',
        area:address.area|| '',
        city: address.city||'',
        state: address.state||'',
        pincode: address.pincode||''
    });

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(restaurant,addressDetails,timingsData);
        const formData = {
            name:restaurant.name,
            description:restaurant.description,
            timings:timingsData
        }
        console.log(formData);
        const token = localStorage.getItem('token')
        const data = await updateRestaurant(resId,formData,token)
        console.log(data,'updated restaurant');
        // Your submission logic here...
    }
    const handleTimingChange = (index, field, value) => {
        const updatedTimings = [...timingsData];
        updatedTimings[index][field] = value;
        setTimingsData(updatedTimings);
    };

    const addTiming = () => {
        setTimingsData([...timingsData, { dayOfWeek: '', openingTime: '', closingTime: '' }]);
    };


    function handleChangeRestaurant(e) {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    function handleChangeAddress(e) {
        setAddressDetails({ ...address, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Restaurant Details</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
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
                            <label htmlFor="gstIn" className="form-label">GSTIN</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gstIn"
                                name="gstIn"
                                value={restaurant.gstIn}
                                readOnly
                                onChange={handleChangeRestaurant}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
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
                                <label>Timing {index + 1}</label>
                                <div>
                                    <label>Day of Week:</label>
                                    <input
                                        type="text"
                                        value={timing.dayOfWeek}
                                        onChange={(e) => handleTimingChange(index, 'dayOfWeek', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Opening Time:</label>
                                    <input
                                        type="text"
                                        value={timing.openingTime}
                                        onChange={(e) => handleTimingChange(index, 'openingTime', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Closing Time:</label>
                                    <input
                                        type="text"
                                        value={timing.closingTime}
                                        onChange={(e) => handleTimingChange(index, 'closingTime', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addTiming}>Add Timing</button>
                        <button type="submit" className="btn btn-primary">Update Restaurant</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h3>Address Details</h3>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={address.street}
                            readOnly
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label">Area</label>
                        <input
                            type="text"
                            className="form-control"
                            id="area"
                            name="area"
                            value={address.area}
                            readOnly
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={address.city}
                            readOnly
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={address.state}
                            readOnly
                            onChange={handleChangeAddress}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pincode"
                            name="pincode"
                            value={address.pincode}
                            readOnly
                            onChange={handleChangeAddress}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
