import axios from "axios";
import {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  deleteListsStart,
  deleteListsSuccess,
  deleteListsFailure,
  createListsStart,
  createListsSuccess,
  createListsFailure,
  updateListsStart,
  updateListsSuccess,
  updateListsFailure,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

// create
export const createList = async (list, dispatch) => {
  dispatch(createListsStart());
  try {
    const res = await axios.post("/lists", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListsSuccess(res.data));
  } catch (err) {
    dispatch(createListsFailure());
  }
};

//update
export const updateList = async (list,dispatch,id) => {
  dispatch(updateListsStart());
  try {
    const res = await axios.post("/lists/" + id, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateListsSuccess(res.data));
  } catch (err) {
    dispatch(updateListsFailure());
  }
};


//delete
export const deleteLists = async (id, dispatch) => {
  dispatch(deleteListsStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListsSuccess(id));
  } catch (err) {
    dispatch(deleteListsFailure());
  }
};