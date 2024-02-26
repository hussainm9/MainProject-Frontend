import { CREATE_BOOKING } from "../actions/actionTypes";


const initialValues = { book: {} }


export const bookReducer = (state = initialValues, action) => {
    switch (action.type) {
        case CREATE_BOOKING: {
            return {
                ...state,
                book: action.payload
            }
        }
        default:
            return { ...state }
    }


}