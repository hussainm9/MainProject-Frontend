import { CLEAR_USER, FAIL_REQUEST, GET_USER, MAKE_REQUEST } from "./actionTypes"
import axios from 'axios'
import axiosInstance from "../../config/axios";
export const makeRequest = () => {
  return {
    type: MAKE_REQUEST
  };
};

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
