import axiosInstance from "../../config/axios"
import { DEC_QUANTITY, GET_MENU, REMOVE_MENU } from "./actionTypes"
import { ADD_MENU } from "./actionTypes"

const getMenuData=(menu)=>{
    return{
        type:GET_MENU,
        payload:menu
    }
}

export const addMenu=(selectMenu)=>{
    return{
        type:ADD_MENU,
        payload:selectMenu
    }

}
 
export const removeMenu=(remove)=>{
    return{
        type:REMOVE_MENU,
        payload:remove
    }
}
export const decQuantity=(dec)=>{
    return{
        type:DEC_QUANTITY,
        payload:dec
    }
}

export const asyncGetMenu=(menu)=>{
    return async(dispatch)=>{
        try{
            console.log("Restaurant ID:", menu.restaurantId)
            const response=await axiosInstance(`/api/${menu.restaurantId}/getOne`,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            dispatch(getMenuData(response.data))
            console.log(response.data,'check')

        }
        catch(e){
            console.log(e.message)
        }

    }
}