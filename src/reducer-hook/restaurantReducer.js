const restaurantReducer = (state, action) => {
    switch (action.type) {
      case 'GET_RESTAURANT': {
        console.log(action.payload, "restaurant")
        return { ...state, restaurantOwner: action.payload }
      }
      case 'GET_ALL':{
        console.log(action.payload,'restaurantGetAll');
        return {...state,allRestaurants:action.payload}
    }
    
      default: {
        return {...state}
      }
    }
  }
  
  export default restaurantReducer
  