import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import {UserContext} from "../../context/userContext/UserContext"
import { deleteUsers, getUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch }= useContext(UserContext);

  useEffect(()=>{
    getUsers(dispatch)
  },[dispatch]);


  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  console.log(users);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "username", headerName: "Username", width: 250 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "isAdmin", headerName: "Admin", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/user/" + params.row._id, user: params.row}}>
              <button className="productListEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newUser">
          <button className="productAddButton">Create</button>
        </Link>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}
