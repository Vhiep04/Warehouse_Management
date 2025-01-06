/* eslint-disable */
import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/api/userApi/user';

import './Header.css';
const Header = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logout();
      toast.success('Đăng xuất thành công');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <div className='heder'>
      <div className='lef'>
        <div><i className="fa-regular fa-star"></i></div>
        <div><p>Công ty ABC</p></div>
      </div>
      <div className='right'>
        <div><i className="fa-regular fa-bell"></i></div>
        <div onClick={handleLogout} style={{ "cursor": "pointer" }}><i className="fa-solid fa-right-from-bracket"></i></div>
      </div>
    </div>
  )
}

export default Header