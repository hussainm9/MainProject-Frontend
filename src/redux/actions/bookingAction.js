import axiosInstance from "../../config/axios";
import { CREATE_BOOKING } from "./actionTypes";

// Action creator to create a booking
export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking
    };
};

// Asynchronous action creator to create a booking
// Asynchronous action creator to create a booking
export const asyncCreateBooking = (book) => {
    return async (dispatch) => {
        try {
            console.log("User ID:", book.userId);
            console.log("Restaurant ID:", book.restaurantId);
            console.log("Table ID:", book.tableId);
            const userId = book.userId;
            const restaurantId = book.restaurantId;
            const tableId = book.tableId;

            // If booking doesn't exist, proceed to create a new one
            const response = await axiosInstance.post(`/api/user/${userId}/restaurant/${restaurantId}/table/${tableId}/booking`, book, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            // Ensure that response.data contains the booking data or modify accordingly
            dispatch(createBooking(response.data));
            console.log(response.data, 'book');
            return response.data; // Return the booking data if necessary

        } catch (error) {
            console.error('Error creating booking:', error);
            throw error; // Re-throw the error for the caller to handle
        }
    };
};



