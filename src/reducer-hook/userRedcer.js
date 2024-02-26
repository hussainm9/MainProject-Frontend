const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      console.log(action.payload, "56789");
      return { ...state, userDetails: action.payload };

    case 'UPDATE_DETAILS':
      console.log(action.value)
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.field]: action.value,
        },
      };
    case 'CLEAR_DETAILS':
      return {...state,userDetails:{}}

    default:
      return state;
  }
};

export default userReducer;
