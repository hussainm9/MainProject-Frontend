import axiosInstance from "../../config/axios"
import { CREATE_BOOKING } from "./actionTypes"

export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking
    }
}

export const asyncCreateBooking = (userId, restaurantId, tableId, book) => {
    return async (dispatch) => {
        try {
            console.log("User ID:", userId);
            console.log("Restaurant ID:", restaurantId);
            console.log("Table ID:", tableId);
            const response = await axiosInstance(`/api/user/${userId}/restaurant/${restaurantId}/table/${tableId}/booking`, {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(book)

            });
            
            dispatch(createBooking(response.data));
            console.log(response.data, 'book');
        } catch (e) {
            console.log(e);
        }
    }
}
