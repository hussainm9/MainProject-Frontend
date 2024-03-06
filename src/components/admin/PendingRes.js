import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import swal from 'sweetalert';
import './PendingRes.css'; // Import CSS file for custom styling

export default function PendingRes() {
  const [pendingRes, setPendingRes] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [isDataVisible, setDataVisible] = useState(false);
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [scrollToId, setScrollToId] = useState(null);

  const fetchPendingRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3786/api/newly-registered', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setPendingRes(response.data);
    } catch (error) {
      console.error('Error fetching pending restaurants:', error);
    }
  };

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  const handleView = (id) => {
    const selectedItem = pendingRes.find((ele) => ele._id === id);
    setSelectedRestaurant(selectedItem);
    setDataVisible(true);
    setScrollToId(id);
    scrollToCard(`details-card`);
    if (selectedItem.address) {
      const address = `${selectedItem.name}, ${selectedItem.address.street}, ${selectedItem.address.area}, ${selectedItem.address.city}, ${selectedItem.address.state}, ${selectedItem.address.pincode}`;
      const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      setGoogleMapsLink(link);
    }
  };

  const scrollToCard = (id) => {
    const cardElement = document.getElementById(id);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    if (scrollToId) {
      scrollToCard(scrollToId);
      setScrollToId(null); // Reset scrollToId after scrolling
    }
  }, [scrollToId]);



  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3786/api/approved-restaurant/${id}`, { newStatus: 'approved' }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      swal("Approved", "Successfully Approved", "success");
      setDataVisible(false);
      fetchPendingRestaurants();
    } catch (error) {
      console.log('Error while changing state:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3786/api/approved-restaurant/${id}`, { newStatus: 'rejected' }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      swal("Rejected", "Rejected Successfully", "success");
      setDataVisible(false);
      fetchPendingRestaurants();
    } catch (error) {
      console.log('Error while changing state:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Pending Restaurants - {pendingRes.length}</h2>

      <div className="row">
        {pendingRes.map((restaurant) => (
          <div key={restaurant._id} id={`restaurant-${restaurant._id}`} className="col-md-4 mb-4">
            <Card className="h-100 restaurant-card">
              <CardHeader style={{ border: 'none' }}>
                <div className="restaurant-card-image-container" onClick={(e) => {
                  e.stopPropagation(); // Prevent bubbling
                  handleView(restaurant._id);
                }}>
                  <img
                    src={restaurant.image}
                    alt="Restaurant"
                    className="img-fluid restaurant-image"
                  />
                </div>


                <hr /> {/* Horizontal line after the name */}
                <h5>{restaurant.name}</h5>
              </CardHeader>
              <CardBody>
                <b>Address</b><br />
                <p className="card-text">{restaurant.address.street}</p>
                <p className="card-text">{restaurant.address.area}</p>
                <p className="card-text">{restaurant.address.city}, {restaurant.address.state} - {restaurant.address.pincode}</p>
                {/* <Table borderless>
                  <tbody>

                    <tr>
                      <td>GST No:</td>
                      <td>{restaurant.gstNo}</td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>{restaurant.address?.city}</td>
                    </tr>
                  </tbody>
                </Table> */}
                <Button onClick={() => handleView(restaurant._id)}>View Details</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      {isDataVisible && (
        <div id="details-card">
          <Card className="m-3">
            <CardHeader className="text-center dark">Details of Restaurant - {selectedRestaurant.name}</CardHeader>
            <CardBody>
              <Table borderless>
                <tbody>
                  <tr>
                    <td><b>Name:</b></td>
                    <td>{selectedRestaurant.name}</td>
                  </tr>
                  <tr>
                    <td><b>Address:</b></td>
                    <td>{selectedRestaurant.address?.street}, {selectedRestaurant.address?.area}, {selectedRestaurant.address?.city}, {selectedRestaurant.address?.state}, {selectedRestaurant.address?.pincode}</td>
                  </tr>
                  <tr>
                    <td><b>Description:</b></td>
                    <td>{selectedRestaurant.description}</td>
                  </tr>
                  <tr>
                    <td><b>GST No:</b></td>
                    <td>{selectedRestaurant.gstNo}</td>
                  </tr>
                  <tr>
                    <td><b>License Number:</b></td>
                    <td><a href={selectedRestaurant.licenseNumber} target="_blank" rel="noopener noreferrer">{selectedRestaurant.licenseNumber}</a></td>
                  </tr>
                  <tr>
                    <td><b>Location:</b></td>
                    <td><a href={googleMapsLink} target="_blank" >`https://www.google.com/maps/search/?{selectedRestaurant.name}`</a></td>
                  </tr>
                </tbody>
              </Table>
              <Button color="success" onClick={() => handleApprove(selectedRestaurant._id)}>Approve</Button>{' '}
              <Button color="danger" onClick={() => handleReject(selectedRestaurant._id)}>Reject</Button>
              <Button color="primary" onClick={() => setDataVisible(false)}>Hide</Button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}