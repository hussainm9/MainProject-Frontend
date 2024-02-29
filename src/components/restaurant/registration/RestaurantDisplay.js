import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../pages/loading';
import axiosInstance from '../../../config/axios';

function RestaurantDisplay() {
    const location = useLocation();
    const [listedData, setListedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance(`/api/getBySearch${location.search}`);
                setListedData(response.data);
                
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <div className="container mt-4">
            <div className="container">
                
                {loading ? (
                    <Loading className='text-center'/> 
                ) : (
                    <div className="row">
                        <h2 className='text-center'>Resulted Restaurants</h2>
                        {/* Render each restaurant as a grid item */}
                        
                        {listedData.map(ele => (
                            <div className="col-md-4 mb-4" key={ele._id}>
                                <div className="card">
                                    <Link to={`/table/${ele._id}`}>
                                        <img
                                            src={`${ele.image}`}
                                            className="card-img-top"
                                            alt="logo"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxHeight: '200px', 
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Link>
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 className="card-title" style={{ margin: 0 }}>
                                            Name: {ele.name}
                                        </h5>
                                        <p style={{ margin: 0 }}>Address: {ele.address.city}, {ele.address.street}</p>
                                        <p className="card-text" style={{ margin: 0 }}>
                                            Description: {ele.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantDisplay;
