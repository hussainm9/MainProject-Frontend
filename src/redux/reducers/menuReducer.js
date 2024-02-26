import { ADD_MENU, DEC_QUANTITY, GET_MENU, REMOVE_MENU } from "../actions/actionTypes"

const initialValues = { menu: [], selectMenu: [] }

export const menuRedcer = (state = initialValues, action) => {
    switch (action.type) {
        case GET_MENU: {
            return {
                ...state,
                menu: action.payload
            }
        }
        case ADD_MENU: {
            const existingItemIndex = state.selectMenu.findIndex(item => item._id === action.payload._id);
            if (existingItemIndex !== -1) {

                const updatedSelectMenu = [...state.selectMenu];
                updatedSelectMenu[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    selectMenu: updatedSelectMenu
                };
            } else {

                const newItem = { ...action.payload, quantity: 1 };
                return {
                    ...state,
                    selectMenu: [...state.selectMenu, newItem]
                };
            }
        }
        case REMOVE_MENU:
            return {
                ...state,
                selectMenu: state.selectMenu.filter(menu => menu._id !== action.payload)
            };
        case DEC_QUANTITY: {
            const existingItemIndex_dec = state.selectMenu.findIndex(item => item._id === action.payload._id);
            if (state.selectMenu[existingItemIndex_dec].quantity >= 1) {
                const updatedSelectMenu = [...state.selectMenu];
                updatedSelectMenu[existingItemIndex_dec].quantity -= 1;
                return {
                    ...state,
                    selectMenu: updatedSelectMenu
                };
            }
            return state; // Return current state if quantity is already 0
        }
        default:
            return { ...state }
    }


}