
import axios from "axios"
export const LIST_RESTAURANT = 'LIST_RESTAURANT'
const listRestaurant = (data)=>{
    return{

        type:'LIST_RESTAURANT',
        payload:data
    }
}
export const listrestaurantApi = ()=>{
    return async(dispatch)=>{
        try{

            const response = await axios.get('http://localhost:3786/api/getAll',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data);
            dispatch(listRestaurant(response.data))
        }catch(e){
            console.log(e,'error');
        }
       
        
    }

}