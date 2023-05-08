import axios from "axios";

import { 
  createUsersFailure, 
  createUsersStart, 
  createUsersSuccess, 
  deleteUsersFailure,
  deleteUsersStart, 
  deleteUsersSuccess,
  getUsersFailure, 
  getUsersStart, 
  getUsersSuccess,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure
   } from "./UserActions";


export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// create
export const createUser = async (user, dispatch) => {
  dispatch(createUsersStart());
  try {
    const res = await axios.post("/users", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUsersSuccess(res.data));
  } catch (err) {
    dispatch(createUsersFailure());
  }
};

//update
export const updateUser = async (id, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await axios.put("/users/638f03a07e5096953093dbfd" , {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUsersSuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};


//delete
export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};