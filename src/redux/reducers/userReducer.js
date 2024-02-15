import {FAIL_REQUEST, GET_USER, MAKE_REQUEST } from "../actions/actionTypes";

const userInitialState  = {
  loading:true,
  user:{},
  errormessage:''
}
const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
      case MAKE_REQUEST:
        
        return {
          ...state,
          loading:true
        } 
      case FAIL_REQUEST:
        return{
          ...state,
          loading:false

        }
      case GET_USER:
        return {
          ...state,
          loading:false,
          errormessage:'',
          user:action.payload
        }
        
        
      default:
        return {...state};
    }
  };
  
  export default userReducer