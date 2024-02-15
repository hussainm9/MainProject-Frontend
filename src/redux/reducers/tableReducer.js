import { FAIL_REQUEST, GET_ONE_TABLE, GET_TABLES, MAKE_REQUEST} from "../actions/actionTypes";

const initialState = { data: [], table: {}, loading: false, error: null };

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null // Reset error when loading starts
            };
        case GET_TABLES:
            if (action.payload.length === 0) {
                return {
                    ...state,
                    loading: false,
                    data: [],
                    error: "No tables found" 
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    error: null
                };
            }
        case GET_ONE_TABLE:
            return {
                ...state,
                loading: false,
                table: action.payload,
                error: null 
            };
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return {...state};
    }
};

export default tableReducer;
