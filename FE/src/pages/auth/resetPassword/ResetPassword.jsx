/* eslint-disable */
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import Header from "../../../components/header/Header";

import "./ResetPassword.css";
import { updatePassword } from "@/api/userApi/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPasswordValidation } from "@/utils/validation/userValidation";
const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    userName: "",
    newPassword: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await updatePassword(values);
      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <div className="resetPassword-body">
        <div className="resetPassword-container">
          <div className="resetPassword-form">
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidation}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <h2 className="resetPassword-h2">ĐỔI MẬT KHẨU</h2>
                  <div className="resetPassword-group-field">
                    <label className="resetPassword-Label" htmlFor="email">
                      Email
                    </label>{" "}
                    <br />
                    <Field
                      className="resetPassword-Field"
                      name="email"
                      type="text"
                    />
                    <ErrorMessage name="email" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
                  </div>

                  <div className="resetPassword-group-field">
                    <label className="resetPassword-Label" htmlFor="userName">
                      Tên đăng nhập
                    </label>{" "}
                    <br />
                    <Field
                      className="resetPassword-Field"
                      name="userName"
                      type="text"
                    />
                    <ErrorMessage name="userName" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
                  </div>

                  <div className="resetPassword-group-field reset-password">
                    <label className="resetPassword-Label" htmlFor="newPassword">
                      Mật khẩu mới
                    </label>{" "}
                    <br />
                    <Field
                      className="resetPassword-Field"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <i className={`reset-eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={tooglePasswordVisibility}></i>
                    <ErrorMessage name="newPassword" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
                  </div>

                  <div>
                    <button className="resetPassword-button" type="submit">
                      Xong
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
