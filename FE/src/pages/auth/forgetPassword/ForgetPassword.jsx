/* eslint-disable */
import React from 'react'

import './ForgetPassword.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Header from '../../../components/header/Header';
import { forgetPassword } from '@/api/userApi/user';
import { toast } from 'react-toastify';
import { forgetPasswordValidation } from '@/utils/validation/userValidation';

const ForgetPassword = () => {
  const initialState = {
    email: '',
    userName: '',
  };

  const handleSubmit = async (values) => {
    try {
      await forgetPassword(values);
      toast.success('Gửi lại mật khẩu thành công. Vui lòng kiểm tra email của bạn');
    } catch (error) {
      console.log(error);
      toast.error('Gửi lại mật khẩu thất bại');
    }
  }
  return (
    <>
      <Header />
      <div className='s0'>
        <Formik
          initialValues={initialState}
          validationSchema={forgetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors }) => (
            <Form className='s1' onSubmit={handleSubmit}>
              <p htmlFor="email" className='s2'> <b>QUÊN MẬT KHẨU</b></p>
              <div className='s3'>
                <label htmlFor="email">Email</label>
                <Field className='boder' name="email" type="email" />
                <ErrorMessage name="email" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
              </div>
              <div className='s4'>
                <label htmlFor="userName">Tên đăng nhập</label>
                <Field className='boder' name="userName" type="text" />
                <ErrorMessage name="userName" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
              </div>
              <div className='s5'>
                <button className='button' type='submit'>Gửi lại mật khẩu</button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default ForgetPassword