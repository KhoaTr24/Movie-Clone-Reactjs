export const getHistoryStart = () => ({
    type:"GET_HISTORY_START",
});

export const getHistorySuccess = (histories) => ({
    type:"GET_HISTORY_SUCCESS",
    payload: histories,
});

export const getHistoryFailure = () => ({
    type:"GET_HISTORY_FAILURE",
});


export const deleteHistoryStart = () => ({
    type:"DELETE_HISTORY_START",
});

export const deleteHistorySuccess = (id) => ({
    type:"DELETE_HISTORY_SUCCESS",
    payload: id,
});

export const deleteHistoryFailure = () => ({
    type:"DELETE_HISTORY_FAILURE",
});