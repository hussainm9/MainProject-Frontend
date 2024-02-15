import axiosInstance from '../config/axios';

export async function createTable(id,formData,token){
    try{
        const response = await axiosInstance.post(`/api/restaurants/${id}/createTable`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response.data);
        return response.data

    }catch(e){
        console.log(e,'table creatte');
    }
}

export async function fetchTables(resId) {
  try {
    const response = await axiosInstance.get(
      `/api/restaurants/${resId}/getTables`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
}

export async function deleteTable(resId, tableId) {
  try {
    await axiosInstance.delete(`/api/restaurants/${resId}/${tableId}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    console.log('Successfully deleted table with id:', tableId);
  } catch (error) {
    console.error('Error deleting table:', error);
    throw error;
  }
}
export async function updateTable(resId,tableId,formData,token){
    try{
       const response = await axiosInstance.put(`api/restaurants/${resId}/${tableId}`,formData,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        return response.data
        console.log(response.data);

    }catch(e){
        console.log('e','table update');
    }

}