import axiosInstance from "../config/axios";
export async function fetchBookingsByDate(resId, token, date) {
    console.log(resId, token, date);
    try {

        const response = await axiosInstance.get(`/api/restaurant/${resId}/bookings`, {
            headers: {
                Authorization: token
            },
            params: {
                date: date
            }
        })
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e, 'err in getting res bookings');
    }
}