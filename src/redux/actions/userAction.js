import { CLEAR_USER, FAIL_REQUEST, GET_USER, MAKE_REQUEST, UPDATE_USER } from "./actionTypes"
import axios from 'axios'
import axiosInstance from "../../config/axios";
export const makeRequest = () => {
  return {
    type: MAKE_REQUEST
  };
};
export const updateRequest=()=>{
  return {
    type:UPDATE_USER
  }
}

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err
  }
}



export const getUser = () => {
  return async (dispatch) => {
    dispatch(makeRequest())
    try {
      const res = await axiosInstance('/api/user/profile', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      const userData = res.data
      dispatch({
        type: GET_USER,
        payload: userData
      })

    } catch (err) {
      dispatch(failRequest(err.message))
    }
  }
}

export const updateUser = (userId, username) => {
  console.log(username,'user6')
  return async (dispatch) => {
    dispatch(updateRequest());
    try {
      const res = await axiosInstance.put(`/api/${userId}/updateProfile`, { username }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const updatedUserData = res.data;
      dispatch({
        type: UPDATE_USER,
        payload: updatedUserData 
      });
    } catch (e) {
      console.log(e);
      dispatch(failRequest(e.message));
    }
  };
};


