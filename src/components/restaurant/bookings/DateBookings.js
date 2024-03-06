import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import bookingContext from '../../../contextApi/bookingContext';
import restaurantContext from '../../../contextApi/restaurantContext';
import { fetchBookingsByDate } from '../../../services/bookingService';



export default function BookingCalendar() {
    const { restaurantState } = useContext(restaurantContext);
    const { bookingDispatch, bookingState } = useContext(bookingContext)

    //console.log(bookingState, 'bookingState', 'bookingDispatch', bookingDispatch);
    const resId = restaurantState.restaurantOwner._id;
    // console.log(resId, 'restaurantId');
    const [date, setDate] = useState('')



    const [value, setValue] = useState(new Date());
    console.log(value.toLocaleDateString(), 'value');
    const [bookings, setBookings] = useState([]);

    async function handleDateChange(selectedDate) {
        setValue(selectedDate);
        console.log(selectedDate.toLocaleDateString());
        setDate(selectedDate.toLocaleDateString())
        try {
            const response = await fetchBookingsByDate(resId, localStorage.getItem('token'), selectedDate.toLocaleDateString());
            console.log(response);
            setBookings(response);
            bookingDispatch({ type: 'BOOKINGS_BY_DATE', payload: response })

        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
        }
    }
    // Updated code with Bootstrap classes:

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Bookings By Date {date ? (<> : {date}</>) : ''}</h2>
                </div>
                <div className="card-body" style={{ height: '475px', overflowY: 'auto' }}>
                    <div className="row">
                        <div className="col-md-8">
                            <ul className="list-group">
                                {/* ... bookings content ... */}
                                {bookings && bookings.length > 0 ? (
                                    bookings.map((ele, i) => (
                                        
                                        <h5 key={ele._id}>
                                            {ele.status&&
                                            <Link to={`/bookings-calendar/${ele._id}`}>{`Booking ${i + 1}`}</Link>}
                                        </h5>
                                    ))
                                ) : (
                                    <h5>No Bookings Found</h5>
                                )}
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <Calendar onChange={handleDateChange} value={value} className="react-calendar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}