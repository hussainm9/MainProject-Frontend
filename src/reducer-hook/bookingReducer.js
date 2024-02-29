function bookingReducer(state, action) {
  if (action.type == 'SET_RES_BOOKINGS') {
    return { ...state, restaurantBookings: action.payload }
  }
  if (action.type == 'APPROVED_RES_BOOKINGS') {
    return { ...state, approvedBookings: action.payload }

  }
  if (action.type == 'REJECTED_RES_BOOKINGS') {
    return { ...state, rejectedBookings: action.payload }

  }


}
export default bookingReducer