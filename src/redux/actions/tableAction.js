import { CLEAR_TALBLES, FAIL_REQUEST, GET_ONE_TABLE, GET_TABLES, MAKE_REQUEST } from "./actionTypes";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";

const loadingRequset=()=>{
  return{
    type:MAKE_REQUEST

  }
}

export const fetchError = (error) => ({
  type: FAIL_REQUEST,
  payload: error,
})

const getTableData=(tables)=>{
    return{
        type:GET_TABLES,
        payload:tables
    }
}
export const clearTableData=(clear)=>{
    return{
        type:CLEAR_TALBLES,
        paload:clear
    }
}

const getOneTable=(onetable)=>{
    return{
        type:GET_ONE_TABLE,
        payload:onetable
    }
}



export const asygetTables = (tables) => {
  
    return async (dispatch) => {
      dispatch(loadingRequset())
      
      try {
        console.log("Restaurant ID:", tables.restaurantId)
        const res = await axiosInstance(`/api/restaurants/${tables.restaurantId}/getTables`,{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
        dispatch(getTableData(res.data))
        console.log(res.data,'345678')
        
        
      } catch (err) {
        dispatch({ type: 'TABLES_ERROR', payload: err.response.data.message })
        console.log(err)
      }
    }
  }

export const asyncgetOneTable=(onetable)=>{
    return async (dispatch) => {
      
        try {
          
          const res = await axiosInstance(`/api/table/${onetable.tableId}`,{
            headers:{
              Authorization:localStorage.getItem('token')
            }
          })
          dispatch(getOneTable(res.data))
          console.log(res.data,'345678')
          
          
        } catch (err) {
          console.log(err)
        }
    }


  }