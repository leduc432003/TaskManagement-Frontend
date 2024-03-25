import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxToolkit/AuthSlice";

const Signin = ({ togglePanel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    console.log("login form: ", formData);
  };
  return (
    <div>
      <h1 className="text-lg font-bold text-center pb-8">Đăng nhập</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập email của bạn"
        />
        <TextField
          fullWidth
          label="Mật khẩu"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu của bạn"
        />
        <div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Đăng nhập
          </button>
        </div>
      </form>
      <div className="mt-5 flex items-center gap-2 py-5 justify-center">
        <span>Bạn có tài khoản chưa?</span>
        <Button onClick={togglePanel} className="text-purple-400">
          Đăng kí
        </Button>
      </div>
    </div>
  );
};

export default Signin;
