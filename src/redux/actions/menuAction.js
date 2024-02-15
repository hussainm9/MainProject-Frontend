import axiosInstance from "../../config/axios"
import { GET_MENU } from "./actionTypes"

const getMenuData=(menu)=>{
    return{
        type:GET_MENU,
        payload:menu
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