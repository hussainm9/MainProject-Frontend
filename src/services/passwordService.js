import axiosInstance from "../config/axios";
export async function updatePassword(data,token){

    try{
        const response = await axiosInstance.put(`/api/updatePassword`,data,{
                    headers:{
                        Authorization:token
                    }
                }) 
                console.log(response.data); 
                return response.data

    }catch(e){
        console.log(e,'update password');
    }

}
export async function forgotPassword(formData){
    try{
        const response =  await axiosInstance.post('/api/user/forgotPassword', formData);
        return response.data
    }catch(e){
        console.log('e','update password');
    }
}

export async function resetPassword(id,formData,token){
    try{
        
        const response = await axiosInstance.post(`/api/resetPassword/${id}/${token}`, formData);
        console.log(response.data);
        return response.data


    }catch(e){
        console.log(e,'reset password');
    }
}
