/* eslint-disable */
import React, { useState } from 'react'

import './Confirm.css';
import Header from '../../../components/header/Header';
import emailIcon from '../../../assets/images/iconEmail.png';
import { resendOTP, verifyOTP } from '@/api/userApi/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ConfirmOTP = () => {
  const [otp, setOtp] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const data = {
      userId,
      otp: Number(otp),
    };
    try {
      console.log("data", data);
      await verifyOTP(data);
      toast.success('Xác thực OTP thành công');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Xác thực OTP thất bại');
    }
  };

  const handleResendOTP = async () => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const data = {
      userId,
      email,
      fullName,
    };
    try {
      await resendOTP(data);
      toast.success('Gửi lại OTP thành công');
    } catch (error) {
      console.log(error);
      toast.error('Gửi lại OTP thất bại');
    };
  };

  return (
    <>
      <Header />
      <div className='otp-body'>
        <div className="otp-container">
          <img src={emailIcon} alt="Email Icon" />
          <h2 className='otp-h2'>Mã OTP gồm 6 chữ số đã được gửi đến bạn qua email</h2>
          <input name='otp' value={otp} type="text" maxLength="6" placeholder="# # # # # #" onChange={(e) => setOtp(e.target.value)} />
          <p className='otp-p' onClick={handleResendOTP}>Gửi lại OTP</p>
          <button className='otp-button' onClick={handleSubmit}>Tiếp</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmOTP