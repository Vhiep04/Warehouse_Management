/* eslint-disable */
import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import React, { useState } from "react";

import "./CreateAgency.css";
import { useNavigate } from "react-router-dom";
import { createdSupply } from "@/api/suppliesAPI/supply";
import { toast } from "react-toastify";
const CreateAgency = () => {
  const navigate = useNavigate();

  const [supply, setSupply] = useState({
    supplyCode: `${Math.floor(Math.random() * 1000000)}`,
    supplyName: "",
    supplyType: "",
    supplyAddress: "",
    supplyPhone: "",
    supplyEmail: "",
    supplyRepresentative: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupply({
      ...supply,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        code: supply.supplyCode,
        name: supply.supplyName,
        address: supply.supplyAddress,
        phone: supply.supplyPhone,
        email: supply.supplyEmail,
        representative: supply.supplyRepresentative,
        type: supply.supplyType,
      };
      await createdSupply(data);
      toast.success("Thêm nguồn hàng thành công");
      navigate('/list-agency');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      throw error;
    }
  };
  return (
    <div>
      <Header className="headerListP" />
      <NavBar />
      <div className="cABody">
        <div className="address">
          <span onClick={() => navigate('/list-agency')}>Quản lý nguồn hàng xuất/nhập</span> &gt; Thêm mới nguồn{" "}
        </div>
        <div className="form">
          <div className="title">Thêm Nguồn</div>
          <div className="content">
            <div className="box">
              <div className="agency_group">
                <div className="createdAgency_div">
                  <p className="agency_p">Mã nguồn</p>
                  <input type="text" className="agency_input" name="supplyCode" value={supply.supplyCode} readOnly/>
                </div>
                <div className="createdAgency_div">
                  <p className="agency_p">Tên nguồn</p>
                  <input type="text" className="agency_input" name="supplyName" value={supply.supplyName} onChange={handleChange}/>
                </div>
                <div className="createdAgency_div">
                  <p className="agency_p">Số điện thoại</p>
                  <input type="text" className="agency_input" name="supplyPhone" value={supply.supplyPhone} onChange={handleChange}/>
                </div>
                <div className="createdAgency_div">
                  <p className="agency_p">Địa chỉ</p>
                  <input type="text" className="agency_input" name="supplyAddress" value={supply.supplyAddress} onChange={handleChange}/>
                </div>
                <div className="createdAgency_div">
                  <p className="agency_p">Email</p>
                  <input type="text" className="agency_input" name="supplyEmail" value={supply.supplyEmail} onChange={handleChange} />
                </div>
                <div className="createdAgency_div">
                  <p className="agency_p">Người đại diện </p>
                  <input type="text" className="agency_input" name="supplyRepresentative" value={supply.supplyRepresentative} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="box1">
              <span>Loại nguồn</span>
              <select name="supplyType" value={supply.supplyType} onChange={handleChange} id="source">
                <option value="">-Chọn loại nguồn-</option>
                <option value="agency">Đại lý</option>
                <option value="provider">Nhà cung cấp</option>
              </select>
            </div>
            <div className="box3">
              <button className="save" type="submit" onClick={handleSubmit}>Lưu</button>
              <button className="cancel" onClick={() => navigate('/list-agency')}>Huỷ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgency;
