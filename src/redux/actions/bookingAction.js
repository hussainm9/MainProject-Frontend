import axiosInstance from "../../config/axios"
import { CREATE_BOOKING } from "./actionTypes"

export const createBooking=(booking)=>{
    return{
        type:CREATE_BOOKING,
        payload:booking
    }

}

export const asyncCreateBooking=(book)=>{
    return async(dispatch)=>{
        try{
            const response=await axiosInstance('')
    
        }
        catch(e){
            console.log(e)
        }

    }
    

}