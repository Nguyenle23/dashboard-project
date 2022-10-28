import "./datatable.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { fetchAllUser } from "../../actions";

export default function Datatable() {
  const [allUser, setAllUser] = useState([]);
  const [userData, setUserData] = useState({});
  
  const location = useLocation();
  console.log(location);
  // const dataUser = setLocation.state.allUser;

  const column = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellWithImg_img"
              src={
                params.row.avatar ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt="avatar"
            />
            {params.row.fullName || "Empty"}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      width: 220,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return (
          <div className="cellWithImg">{params.row.phoneNumber || "Empty"}</div>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "destroy",
      headerName: "Is Destroy",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      width: 100,
    },
    {
      field: "admin",
      headerName: "Is Admin",
      width: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={{ pathname: "/user/" + params.row.id, userData: params.row }}
              style={{ textDecoration: "none" }}
            >
              <div className="cellAction_view">View</div>
            </Link>
            <div className="cellAction_delete">Delete</div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getAllUsers = async () => {
      fetchAllUser().then((response) => {
        setAllUser(response.data);
      });
    };
    getAllUsers();
  }, []);

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="secondary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <div className="datatable">
      <div className="datatable_add">
        <Link
          to="/user/new"
          style={{ textDecoration: "none" }}
          className="datatable_addnew"
        >
          ADD NEW USER
        </Link>
      </div>
      <div style={{ height: "75vh", width: "100%" }}>
        <DataGrid
          rows={allUser.map((user, index) => {
            return {
              id: index,
              email: user.email,
              fullName: user.fullName,
              gender: user.gender,
              avatar: user.avatar,
              location: user.location,
              phoneNumber: user.phoneNumber,
              destroy: user.destroy,
              admin: user.admin,
            };
          })}
          columns={column}
          pageSize={8}
          rowsPerPageOptions={[12]}
          pagination
          components={{
            Pagination: CustomPagination,
          }}
          sx={{
            fontSize: "15px",
            bgcolor: "#baffc9",
            border: "3px solid #333",
            "& .super-app-theme--header": {
              color: "#000",
              fontWeight: "600",
              borderRight: " solid #333",
              borderBottom: " solid #333",
            },
            "& .super-app-theme--cell": {
              color: "#000",
              backgroundColor: "rgba(224, 183, 60, 0.55)",
              fontWeight: "600",
              borderRight: " solid #333",
              borderBottom: " solid #333",
            },
          }}
        />
      </div>
    </div>
  );
}
