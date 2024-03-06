import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

export default function RejectedRes() {
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    const fetchRejectedRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3786/api/rejected', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        const data = response.data;
        setRejected(data);
      } catch (error) {
        console.log('Error fetching rejected restaurants:', error);
      }
    };
    fetchRejectedRestaurants();
  }, []);

  function handleReason(res) {
    // Toggle the reason and button state for the clicked restaurant
    setRejected(rejected.map(restaurant => {
      if (restaurant._id === res._id) {
        // Toggle the reason and button state for the clicked restaurant
        restaurant.button = !restaurant.button;
        restaurant.reason = 'incomplete licensing documentation, hygiene concerns observed during inspection, or menu items unsuitable for delivery';
      } else {
        // Reset the reason and button state for other restaurants
        restaurant.button = false;
        restaurant.reason = '';
      }
      return restaurant;
    }));
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Rejected Restaurants - {rejected.length}</h2>
      <div className="row">
        {rejected.map((restaurant, index) => (
          <div key={restaurant._id} className="col-md-4 mb-4">
            <Card>
              <CardHeader>{restaurant.name}</CardHeader>
              <CardBody>
                <b>Address</b><br />
                <p className="card-text">{restaurant.address.street}</p>
                <p className="card-text">{restaurant.address.area}</p>
                <p className="card-text">{restaurant.address.city}, {restaurant.address.state} - {restaurant.address.pincode}</p>
                <Button
                  color={restaurant.button ? 'danger' : 'info'}
                  onClick={() => { handleReason(restaurant) }}
                  className="mb-2"
                >
                  {restaurant.button ? 'Hide Reason' : 'View Reason'}
                </Button><br />
                {restaurant.button && <b className="reason-text">{restaurant.reason}</b>}
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}