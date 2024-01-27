import axios from 'axios';
import { useEffect, useState } from "react";

export default function Home() {
    const [restaurant, setRestaurant] = useState({
        restaurantName: '',
        restaurantEmail: '',
        gstIn: '',
        fssai: '',
        selectedFile: null,
    });

    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [county, setCounty] = useState('');
    const [district, setDistrict] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Handle form submission
    }

    function handleChange(e) {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        // Handle file input change
    }

    function handleUpload() {
        // Handle file upload
    }

    useEffect(() => {
        if (pincode) {
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${pincode}&countrycode=IN&key=0507c5bf85f34c82b85064dd9b0a019a`)
                .then((response) => {
                    console.log(response.data);
                    const data = response.data;
                    setState(data.results[0].components.state);
                    setCountry(data.results[0].components.country);
           
                    const suburb = data.results[0].components.suburb;
                    const countyValue = suburb ? `${suburb}, ${data.results[0].components.county}` : data.results[0].components.county;
                    setCounty(countyValue);

                    const cityDistrict = data.results[0].components.city_district;
                    const districtValue = cityDistrict ? `${cityDistrict}, ${data.results[0].components.state_district}` : data.results[0].components.state_district;
                    setDistrict(districtValue);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [pincode]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">Restaurant Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <fieldset className="mb-4">
                        <legend>Restaurant Details</legend>
                        <div className="mb-3">
                            <label htmlFor="restaurantName" className="form-label">Enter Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={restaurant.restaurantName}
                                onChange={handleChange}
                                name='restaurantName'
                                id='restaurantName'
                                style={{ width: 'calc(100% + 1rem)' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="restaurantEmail" className="form-label">Enter Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={restaurant.restaurantEmail}
                                onChange={handleChange}
                                name='restaurantEmail'
                                id='restaurantEmail'
                                style={{ width: 'calc(100% + 1rem)' }}
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
                                style={{ width: 'calc(100% + 1rem)' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fssai" className="form-label">FSSAI License</label>
                            <input
                                type="file"
                                className="form-control"
                                name="fssai"
                                id="fssai"
                                onChange={handleFileChange}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend>Address Details</legend>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Enter Pincode</label>
                            <input
                                type="number"
                                className="form-control"
                                value={pincode}
                                id="pincode"
                                name="pincode"
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="county" className="form-label">County</label>
                            <input
                                className="form-control"
                                value={county}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="district" className="form-label">District</label>
                            <input
                                className="form-control"
                                value={district}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input
                                className="form-control"
                                value={state}
                                id="state"
                                name="state"
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input
                                className="form-control"
                                value={country}
                                readOnly
                            />
                        </div>
                    </fieldset>

                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    );
}
