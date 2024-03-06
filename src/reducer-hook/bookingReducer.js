function bookingReducer(state, action) {
    if (action.type == 'BOOKINGS_BY_DATE') {
        return { ...state, restaurantBookings: action.payload }
    }




}
export default bookingReducer