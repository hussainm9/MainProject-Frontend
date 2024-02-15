import { GET_MENU } from "../actions/actionTypes"

const initialValues={menu:[]}

export const menuRedcer=(state=initialValues,action)=>{
    switch(action.type){
        case GET_MENU:{
            return {
                ...state,
                menu:action.payload
            }
        }
        default:
        return {...state}
    }
    
    
}