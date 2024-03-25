import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../ReduxToolkit/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  return (
    <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10, flex justify-between items-center">
      <p className="font-bold text-lg">Quản lý nhiệm vụ</p>
      <div className="flex items-center gap-5">
        <p>{auth.user.fullName}</p>
        <Avatar sx={{ backgroundColor: "c24dd0" }} className="bg-[#c24dd0]">
          C
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
