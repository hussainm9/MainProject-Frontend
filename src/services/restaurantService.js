import axiosInstance from "../config/axios";
export async function updateRestaurant(id,data,token){
    try{

        const response = await axiosInstance.put(`/api/restaurantOwner/${id}`,data,{
            headers:{
                Authorization:token
            }
        })
        console.log(response.data)
        return response.data

    }catch(e){

        console.log(e,'error in catch block');
    }

}
export async function restaurantRegistration(formData,token){

    try{
        const response = await axiosInstance.post('/api/restaurantRegister', formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        });
        console.log(response.data);
        return response.data


    }catch(e){
        console.log(e,'error in catch block');
    }
}