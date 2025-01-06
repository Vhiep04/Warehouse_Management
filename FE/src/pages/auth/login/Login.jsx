/* eslint-disable */
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { setUser } from '@/store/userSlice';
import { useNavigate } from 'react-router-dom';
import { loginValidation } from '@/utils/validation/userValidation';
import { login } from '@/api/userApi/user';
import loginImage from "../../../assets/images/login.png";
import Header from '../../../components/header/Header';

import './Login.css';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    try {
      const user = await login(values);
      toast.success('Đăng nhập thành công');
      dispath(setUser(user));
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Đăng nhập thất bại');
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleClickForgetPassword = () => {
    navigate('/forgetPassword');
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="contener">
                <div className="login-left">
                  <img className="login-img" src={loginImage} alt="" />
                </div>
                <div className="login-right">
                  <p className="login-h1">
                    <b>ĐĂNG NHẬP VÀO TÀI KHOẢN</b>
                  </p>
                  <div className="login-s1">
                    <label htmlFor="userName" className="login-label">
                      Tên đăng nhập
                    </label>
                    <Field name="userName" className="login-boder" type="text" />
                    <ErrorMessage name="userName" style={{ "color": 'red', "fontSize": '12px' }} component='div' />
                  </div>
                  <div className="login-s1 login-eye">
                    <label htmlFor="password" className="login-label">
                      Mật khẩu
                    </label>
                    <Field
                      name="password"
                      className="login-boder"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <i className={`login-eye-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`} onClick={tooglePasswordVisibility}></i>
                    <ErrorMessage name="password" style={{ "color": 'red', "fontSize": '12px' }} component='div' />
                  </div>
                  <div className="login-s2">
                    <div className="login-check">
                      <input name="recomenPassWord" type="radio" />
                      <label htmlFor="recomenPassWord" className="login-label">
                        Ghi nhớ tôi
                      </label>
                    </div>
                    <div>
                      <p className="login-link" onClick={handleClickForgetPassword}>
                        Quên mật khẩu?
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="login-but" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login