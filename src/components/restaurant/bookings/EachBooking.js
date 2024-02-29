import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import bookingContext from '../../../contextApi/bookingContext';
import { updateBooking } from '../../../services/bookingService';

function EachBooking() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { bookingState } = useContext(bookingContext);
    const { restaurantBookings, approvedBookings, rejectedBookings } = bookingState;

    let result;

    if (approvedBookings.length === 0 && rejectedBookings.length === 0) {
        result = restaurantBookings.find(booking => booking._id === id);
    } else if (rejectedBookings.length === 0 && restaurantBookings.length === 0) {
        result = approvedBookings.find(booking => booking._id === id);
    } else if (restaurantBookings.length === 0 && approvedBookings.length === 0) {
        result = rejectedBookings.find(booking => booking._id === id);
    }

    const formatDate = date => {
        if (!date) return '';

        const dateTime = new Date(date);
        const formattedDate = dateTime.toLocaleDateString();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        return `${formattedDate} ${formattedTime}`;
    };

    const handleApprove = async () => {
        try {
            const data = await updateBooking(id, { newStatus: 'approved' }, localStorage.getItem('token'));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Booking has been approved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/bookings');
        } catch (e) {
            console.log(e, 'error in handle approve');
        }
    };

    const handleReject = async () => {
        try {
            const data = await updateBooking(id, { newStatus: 'rejected' }, localStorage.getItem('token'));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Booking has been rejected",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (e) {
            console.log(e, 'error in handle reject');
        }
    };

    if (!result) {
        return <div>No booking found with the given id.</div>;
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="border p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <h3 className="text-center">User Details</h3>
                <p><b>Name</b> - {result.userId.username}</p>
                <p><b>Email</b> - {result.userId.email}</p>

                <h3 className="text-center">Table Details</h3>
                <p><b>Table Number</b> - {result.tableId[0].tableNumber}</p>
                <p><b>No of Seats</b> - {result.tableId[0].noOfSeats}</p>
                <p><b>Advance Amount</b> - {result.tableId[0].advanceAmount}</p>

                <h3 className="text-center">Booking Details</h3>
                <p><b>No of People</b> - {result.noOfPeople}</p>
                <p><b>Start Date Time</b> - {formatDate(result.startDateTime)}</p>
                <p><b>End Date Time</b> - {formatDate(result.endDateTime)}</p>

                {restaurantBookings.length > 0 &&
                    <div className="text-center">
                        <Button color="success" onClick={handleApprove} style={{ marginRight: '10px' }}>Approve</Button>
                        <Button color="danger" onClick={handleReject}>Reject</Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default EachBooking;


// import React, { useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import Swal from 'sweetalert2';
// import bookingContext from '../../../contextApi/bookingContext';
// import { updateBooking } from '../../../services/bookingService';
// function EachBooking() {
//     const navigate = useNavigate()
//     const { id } = useParams();
//     const { bookingState } = useContext(bookingContext);
//     const { restaurantBookings, approvedBookings, rejectedBookings } = bookingState
//     console.log(restaurantBookings, approvedBookings, rejectedBookings, 'each bookings');
//     let result;
//     if (approvedBookings.length == 0 && rejectedBookings.length == 0) {

//         result = restaurantBookings.find(booking => booking._id === id);
//     } else if (rejectedBookings.length == 0 && restaurantBookings.length == 0) {
//         result = approvedBookings.find(booking => booking._id === id);

//     } else if (restaurantBookings.length == 0 && approvedBookings.length == 0) {
//         result = rejectedBookings.find(booking => booking._id === id);

//     }
//     console.log(result, 'form result');

//     // Function to format date
//     const formatDate = date => {
//         if (!date) return ''; // Return empty string if date is not provided

//         const dateTime = new Date(date);

//         // Format the date
//         const formattedDate = dateTime.toLocaleDateString();

//         // Format the time
//         const hours = dateTime.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
//         const minutes = dateTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
//         const formattedTime = `${hours}:${minutes}`;

//         return `${formattedDate} ${formattedTime}`; // Concatenate date and time
//     };

//     const handleApprove = async () => {
//         try {
//             const data = await updateBooking(id, { newStatus: 'approved' }, localStorage.getItem('token'))
//             console.log(data, 'done');
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Booking has been approved",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             navigate('/bookings')
//         } catch (e) {
//             console.log(e, 'err in handle approve');
//         }

//     };

//     const handleReject = async () => {
//         try {
//             const data = await updateBooking(id, { newStatus: 'rejected' }, localStorage.getItem('token'))
//             console.log(data, 'done');
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Booking has been rejected    ",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         } catch (e) {
//             console.log(e, 'err in handle approve');
//         }
//     };

//     if (!result) {
//         return <div>No booking found with the given id.</div>;
//     }

//     return (
//         <div>
//             <h3>User Details</h3>
//             <p>Name - {result.userId.username}</p>
//             <p>Email - {result.userId.email}</p>

//             <h3>Table Details</h3>
//             <p>Table Number - {result.tableId[0].tableNumber}</p>
//             <p>No of Seats - {result.tableId[0].noOfSeats}</p>
//             <p>Advance Amount - {result.tableId[0].advanceAmount}</p>

//             <h3>Booking Details</h3>
//             <p>No of People - {result.noOfPeople}</p>
//             <p>Start Date Time - {formatDate(result.startDateTime)}</p>
//             <p>End Date Time - {formatDate(result.endDateTime)}</p>
//             {restaurantBookings.length > 0 &&
//                 <div>
//                     <Button color="success" onClick={handleApprove} style={{ marginRight: '10px' }}>Approve</Button>
//                     <Button color="danger" onClick={handleReject}>Reject</Button>
//                 </div>
//             }


//         </div>
//     );
// }

// export default EachBooking;
