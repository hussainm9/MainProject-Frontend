import axiosInstance from "../config/axios";
export async function pendingBookings(resId, token) {
    try {

        const response = await axiosInstance.get(`/api/restaurant/${resId}/bookings`, {
            headers: {
                Authorization: token
            }
        })
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e, 'err in getting res bookings');
    }
}
export const updateBooking = async (bookingId, body, token) => {
    try {
        const response = await axiosInstance.put(`/api/update-restaurant/booking/${bookingId}`, body, {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data, 'approved Bookings');
        return response.data; // Return the data received from the server
    } catch (error) {
        throw error; // Throw an error if request fails
    }
};

export async function approvedBookings(resId, token) {
    try {
        const response = await axiosInstance.get(`/api/restaurant/${resId}/bookings/approved`, {
            headers: {
                Authorization: token
            }
        })
        console.log(response.data, 'approved service');
        return response.data

    } catch (e) {
        console.log(e, 'err in approved bookings services');
    }
}
export async function rejectedBookings(resId, token) {
    try {
        const response = await axiosInstance.get(`/api/restaurant/${resId}/bookings/rejected`, {
            headers: {
                Authorization: token
            }
        })
        console.log(response.data, 'rejected service');
        return response.data

    } catch (e) {
        console.log(e, 'err in rejected bookings services');
    }
}
