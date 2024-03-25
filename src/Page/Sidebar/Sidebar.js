import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import CreateTaskForm from "../Task/CreateTask";
import { logout } from "../../ReduxToolkit/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const menu = [
  {
    name: "Trang chủ",
    value: "HOME",
    role: ["ROLE_ADMIN", "ROLE_CUSTOMER"],
  },
  {
    name: "Hoàn thành",
    value: "DONE",
    role: ["ROLE_ADMIN", "ROLE_CUSTOMER"],
  },
  {
    name: "Đã giao",
    value: "DONE",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Chưa giao",
    value: "PENDING",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Tạo nhiệm vụ mới",
    value: "",
    role: ["ROLE_ADMIN"],
  },
  {
    name: "Thông báo",
    value: "NOTIFICATION",
    role: ["ROLE_CUSTOMER"],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Trang chủ");
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };
  const handleOpenCreateTaskModel = () => {
    setOpenCreateTaskForm(true);
  };
  const handleMenuChange = (item) => {
    const updateParams = new URLSearchParams(location.search);
    if (item.name === "Tạo nhiệm vụ mới") {
      handleOpenCreateTaskModel();
    } else if (item.name === "Trang chủ") {
      updateParams.delete("filter");
      const queryString = updateParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;
      navigate(updatedPath);
    } else {
      updateParams.set("filter", item.value);
      navigate(`${location.pathname}?${updateParams.toString()}`);
    }
    setActiveMenu(item.name);
  };
  const handleLogout = () => {
    dispatch(logout());
    console.log("handle logout");
  };
  return (
    <>
      <div className="card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-blue-950"
              src="https://previews.123rf.com/images/dstarky/dstarky1701/dstarky170101648/69931017-management-icon-or-logo-in-modern-line-style-high-quality-black-outline-pictogram-for-web-site.jpg"
            ></Avatar>
          </div>
          {menu
            .filter((item) => item.role.includes(auth.user.role))
            .map((item) => (
              <p
                onClick={() => handleMenuChange(item)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer 
                ${activeMenu === item.name ? "activeMenuItem" : "menuItem"}`}
              >
                {item.name}
              </p>
            ))}

          <Button
            onClick={handleLogout}
            className="logoutButton"
            fullWidth
            sx={{ padding: ".7rem", borderRadius: "2rem" }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
      <CreateTaskForm
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default Sidebar;
