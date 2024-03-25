import React, { useState } from "react";
import "./Auth.css";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const togglePanel = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className="flex justify-center h-screen items-center overflow-hidden">
      <div className="box lg:max-w-4xl">
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className="front">
            <img
              src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                Thành công được xây dựng dựa trên các nhiệm vụ được tổ chức tốt
              </span>
              <span className="text-2">Hãy kết nối</span>
            </div>
          </div>
          <div className="back">
            <img
              src="https://icalde.org/wp-content/uploads/2017/11/Register-now-840x416.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="forms h-full">
          <div className="form-content h-full">
            <div className="login-form">
              <Signin togglePanel={togglePanel} />
            </div>
            <div className="signup-form">
              <Signup togglePanel={togglePanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
