const HistoryReducer = (state, action) => {
    switch (action.type) {
        case "DELETE_HISTORY_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_HISTORY_SUCCESS":
            return {
                histories: state.histories.filter((history) => history._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_HISTORY_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };

        case "GET_HISTORY_START":
            return {
                histories: null,
                isFetching: true,
                error: false,
        };
        case "GET_HISTORY_SUCCESS":
            return {
                histories: action.payload,
                isFetching: false,
                error: false,
        };
        case "GET_HISTORY_FAILURE":
            return {
                histories: null,
                isFetching: false,
                error: true,
        };
    }
  };
  
  export default HistoryReducer;