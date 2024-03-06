import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import './ApprovedRes.css'; // Import CSS file for custom styles

export default function ApprovedRes() {
    const [approved, setApproved] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    function handleMap(res) {
        const name = res.name;
        const address = `${res.name}, ${res.address.street},${res.address.area},${res.address.city},${res.address.state},${res.address.pincode}`;
        console.log(name, address);
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        console.log(googleMapsLink);
        window.location.href = googleMapsLink;
    }

    useEffect(() => {
        const fetchApprovedRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:3786/api/approved', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                const data = response.data;
                setApproved(data);
            } catch (error) {
                console.error('Error fetching approved restaurants:', error);
            }
        };
        fetchApprovedRestaurants();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Approved Restaurants - {approved.length}</h2>
            <div className="row">
                {approved.map((restaurant, index) => (
                    <div key={restaurant._id} className="col-md-4 mb-4">
                        <Card className="h-100 restaurant-card">
                            <CardHeader
                                className={hoveredIndex === index ? 'restaurant-card-header-hovered' : 'restaurant-card-header'}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img
                                    src={restaurant.image}
                                    alt="Restaurant"
                                    className="img-fluid restaurant-image"
                                />
                                <h5 className="card-title">{restaurant.name}</h5>
                            </CardHeader>
                            <CardBody>
                                <b>Address</b><br />
                                <p className="card-text">{restaurant.address.street}</p>
                                <p className="card-text">{restaurant.address.area}</p>
                                <p className="card-text">{restaurant.address.city}, {restaurant.address.state} - {restaurant.address.pincode}</p>
                                <Button onClick={() => { handleMap(restaurant) }} color="info">View in Map</Button>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}