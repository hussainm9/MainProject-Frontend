import React, { useContext } from 'react';
import restaurantContext from '../../contextApi/restaurantContext';
import { Link } from 'react-router-dom'

function RestaurantDisplay() {
    const { restaurantState } = useContext(restaurantContext);
    const { allRestaurants } = restaurantState;

    const token=localStorage.getItem('token')

    // Filter the allRestaurants array to include only restaurants with status 'approved'
    const approvedRestaurants = allRestaurants.filter(restaurant => restaurant.status === 'approved');

    return (
        <div className="container">
            <h2>Approved Restaurant List - {approvedRestaurants.length}</h2>

            <div className="row">
                {/* Render each restaurant as a grid item */}
                {approvedRestaurants.map(ele => (
                    <div className="col-md-4 mb-4" key={ele._id}>
                        <div className="card">
                        <Link to={token ? `/table/${ele._id}` : '/login'}>
                            <img
                                src={`http://localhost:3786/upload/images/${ele.image}`}
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
    );
}

export default RestaurantDisplay;
