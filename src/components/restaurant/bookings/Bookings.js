import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import bookingContext from '../../../contextApi/bookingContext';
import restaurantContext from '../../../contextApi/restaurantContext';
import { approvedBookings, pendingBookings, rejectedBookings } from '../../../services/bookingService';

function Bookings() {
  const { restaurantState } = useContext(restaurantContext);
  const { bookingDispatch, bookingState } = useContext(bookingContext);
  console.log(bookingState, 'booking');
  const { restaurantBookings } = bookingState
  const appBookings = bookingState.approvedBookings;
  const rejBookings = bookingState.rejectedBookings;
  const resId = restaurantState.restaurantOwner._id;
  const token = localStorage.getItem('token');

  // State to track the currently active button
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <button className={`btn btn-primary ${activeButton === 'pending' ? 'active' : ''}`} onClick={() => handleButtonClick('pending')}>Pending</button>
          {activeButton === 'pending' && renderPendingBookings()}
        </div>

        <div className="col-sm">
          <button className={`btn btn-success ${activeButton === 'approved' ? 'active' : ''}`} onClick={() => handleButtonClick('approved')}>Approved</button>
          {activeButton === 'approved' && renderApprovedBookings()}
        </div>

        <div className="col-sm">
          <button className={`btn btn-danger ${activeButton === 'rejected' ? 'active' : ''}`} onClick={() => handleButtonClick('rejected')}>Rejected</button>
          {activeButton === 'rejected' && renderRejectedBookings()}
        </div>
      </div>
    </div>
  );

  // Function to render pending bookings
  function renderPendingBookings() {
    return (
      <div className="mt-3">
        <h2>Pending Bookings</h2>
        {(!restaurantBookings || restaurantBookings.length === 0) && <h4>No pending bookings found</h4>}

        {/* {(restaurantBookings && restaurantBookings.length === 0) && <h3>No bookings found</h3>} */}
        <ul>
          {restaurantBookings && restaurantBookings.map((ele, i) => (
            <h5 key={ele._id}>
              <Link to={`/booking/${ele._id}`}>{`Booking ${i + 1}`}</Link>
            </h5>
          ))}
        </ul>
      </div>
    );
  }

  // Function to render approved bookings
  function renderApprovedBookings() {
    return (
      <div className="mt-3">
        <h2>Approved Bookings</h2>
        {(!appBookings || appBookings.length === 0) && <h4>No approved bookings found</h4>}

        {/* {(appBookings && appBookings.length === 0) && <h3>No bookings found</h3>} */}
        <ul>
          {appBookings && appBookings.map((ele, i) => (
            <h5 key={ele._id}>
              <Link to={`/booking/${ele._id}`}>{`Booking ${i + 1}`}</Link>
            </h5>
          ))}
        </ul>
      </div>
    );
  }

  // Function to render rejected bookings
  function renderRejectedBookings() {
    return (
      <div className="mt-3">
        <h2>Rejected Bookings</h2>
        {(!rejBookings || rejBookings.length === 0) && <h4>No rejected bookings found</h4>}

        {/* {(rejBookings && rejBookings.length === 0) && <h3>No bookings found</h3>} */}

        <ul>
          {rejBookings && rejBookings.map((ele, i) => (
            <h5 key={ele._id}>
              <Link className='booking-link' to={`/booking/${ele._id}`}>{`Booking ${i + 1}`}</Link>
            </h5>
          ))}
        </ul>
      </div>
    );
  }

  // Function to handle button click and fetch respective bookings
  async function handleButtonClick(button) {
    setActiveButton(button);
    try {
      switch (button) {
        case 'pending':
          const data = await pendingBookings(resId, token);
          bookingDispatch({ type: 'SET_RES_BOOKINGS', payload: data });
          bookingDispatch({ type: 'APPROVED_RES_BOOKINGS', payload: [] });
          bookingDispatch({ type: 'REJECTED_RES_BOOKINGS', payload: [] });
          break;
        case 'approved':
          const approvedData = await approvedBookings(resId, token);
          bookingDispatch({ type: 'APPROVED_RES_BOOKINGS', payload: approvedData });
          bookingDispatch({ type: 'REJECTED_RES_BOOKINGS', payload: [] });
          bookingDispatch({ type: 'SET_RES_BOOKINGS', payload: [] });
          break;
        case 'rejected':
          const rejectedData = await rejectedBookings(resId, token);
          bookingDispatch({ type: 'REJECTED_RES_BOOKINGS', payload: rejectedData });
          bookingDispatch({ type: 'SET_RES_BOOKINGS', payload: [] });
          bookingDispatch({ type: 'APPROVED_RES_BOOKINGS', payload: [] });
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e, 'error in handling bookings');
    }
  }
}

export default Bookings;
