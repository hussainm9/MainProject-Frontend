import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import restaurantContext from '../../contextApi/restaurantContext';
import { Link } from 'react-router-dom';


export default function Display() {
    const { restaurantState } = useContext(restaurantContext);
    const { allRestaurants } = restaurantState;
    const approvedRestaurants = allRestaurants.filter(restaurant => restaurant.status === 'approved');
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        const fetchData = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(fetchData)
    }, []);

    const token = localStorage.getItem('token');

    return (
        <div className="container mt-4">
            {loading ? ( 
                <div className="text-center">
                    
                </div>
            ) : (
                <div className="container">
                    <h2 className='text-center'>Top Rated Restaurants</h2>
                    <div className="row">
                        {/* Render each restaurant as a grid item */}
                        {approvedRestaurants.map(ele => (
                            <div className="col-md-4 mb-4" key={ele._id}>
                                <div className="card">
                                    <Link to={token ? `/table/${ele._id}` : '/login'}>
                                        <img
                                            src={`${ele.image}`}
                                            className="card-img-top"
                                            alt="logo"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                maxHeight: '200px', // Set max height to avoid stretching large images
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Link>
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 className="card-title" style={{ margin: 0 }}>Name: {ele.name}</h5>
                                        <p style={{ margin: 0 }}>Address: {ele.address.city}, {ele.address.street}</p>
                                        <p className="card-text" style={{ margin: 0 }}>Description: {ele.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
