import axios from "axios";
import { deleteHistoryFailure, deleteHistoryStart, deleteHistorySuccess } from "./HistoryActions";



//delete
export const deleteHistory = async (id, dispatch) => {
  dispatch(deleteHistoryStart());
  try {
    await axios.delete("/histories/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteHistorySuccess(id));
  } catch (err) {
    dispatch(deleteHistoryFailure());
  }
};

//getHistory


