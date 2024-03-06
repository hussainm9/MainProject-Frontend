import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import bookingContext from '../../../contextApi/bookingContext';

function EachBooking() {
    const { id } = useParams();
    const { bookingState } = useContext(bookingContext);
    const bookings = bookingState.restaurantBookings;
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const result = bookings.find((ele) => ele._id === id);
        setBookingDetails(result);
    }, [id, bookings]);

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (date) => {
        if (!date) return '';
        const dateTime = new Date(date);
        const formattedDate = dateTime.toLocaleDateString();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const formattedTime =`${hours}:${minutes}`;
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className="d-flex justify-content-center">
            <Card className="border p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <CardBody>
                    <CardTitle tag="h3" className="text-center" style={{ fontSize: '1.5rem', fontWeight: 'bold', }}>
                        Booking Details of {bookingDetails.userId.username.toUpperCase()} on {formatDate(bookingDetails.startDateTime).split(' ')[0]}

                    </CardTitle><br />

                    <CardTitle tag="h3" className="text-center">User Details</CardTitle>
                    <p style={{ fontSize: '1.2rem' }}><b>Name:</b> {bookingDetails.userId.username}</p>
                    <p style={{ fontSize: '1.2rem' }}><b>Email:</b> {bookingDetails.userId.email}</p>

                    <hr />

                    <CardTitle tag="h3" className="text-center">Table Details</CardTitle>
                    <p style={{ fontSize: '1.2rem' }}><b>Table Number:</b> {bookingDetails.tableId.tableNumber}</p>
                    <p style={{ fontSize: '1.2rem' }}><b>No of Seats:</b> {bookingDetails.tableId.noOfSeats}</p>
                    <p style={{ fontSize: '1.2rem' }}><b>Advance Amount:</b> {bookingDetails.tableId.advanceAmount}</p>

                    <hr />

                    <CardTitle tag="h3" className="text-center">Booking Details</CardTitle>
                    <p style={{ fontSize: '1.2rem' }}><b>No of People:</b> {bookingDetails.noOfPeople}</p>
                    <p style={{ fontSize: '1.2rem' }}><b>Start Date Time:</b> {formatDate(bookingDetails.startDateTime)}</p>
                    <p style={{ fontSize: '1.2rem' }}><b>End Date Time:</b> {formatDate(bookingDetails.endDateTime)}</p>

                    <hr />

                    <CardTitle tag="h3" className="text-center">Menu Details</CardTitle>
                    <Table borderless style={{ fontSize: '1.2rem' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingDetails.menuItems.map((menuItem, index) => (
                                <tr key={index}>
                                    <td>{menuItem.menuId.name}</td>
                                    <td>{menuItem.menuId.price}</td>
                                    <td>{menuItem.quantity}</td>
                                    <td>{menuItem.menuId.price * menuItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}

export default EachBooking;




