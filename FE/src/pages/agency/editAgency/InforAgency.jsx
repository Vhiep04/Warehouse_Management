/* eslint-disable*/
import React, { useEffect, useState } from "react";

import "./InforAgency.css";
import Header from "../../../components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplyById } from "@/api/suppliesAPI/supply";

const InforAgency = () => {

  const [supply, setSupply] = useState({});

  const { type, supplyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getSupplyInfo = async () => {
      const res = await getSupplyById(type, supplyId);
      if (type === "agency") {
        setSupply(res.agency);
      } else {
        setSupply(res.provider);
      }
    }

    getSupplyInfo();
  }, []);

  return (
    <>
      <Header className="header_editAgency" />
      <NavBar />
      <div className="container_editAgency">
        <div className="h1_editAgency">
          <p className="text__1">
            <span onClick={() => navigate('/list-agency')} style={{cursor: "pointer"}}>Quản lí nguồn{" "}</span>
            <span>
              <i className="fa-solid fa-chevron-right"></i>
            </span>{" "}
            <span>Xem thông tin nguồn</span>
          </p>
        </div>
        <div className="h2_editAgency">
          <div className="sub1_editAgency">
            <p className="text_sub1_editAgency">Thông tin nguồn</p>
          </div>
          <div className="sub2_editAgency">
            <div className="idAgency">
              <label htmlFor="mk" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Mã nguồn</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >{supply.providerCode || supply.agencyCode }</div>
            </div>
            <div className="nameAgency">
              <label htmlFor="th" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Tên nguồn</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >
                {supply.providerName || supply.agencyName}
              </div>
            </div>
            <div className="nameAgency">
              <label htmlFor="th" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loại nguồn</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >
                {supply.providerName ? "Nhà cung cấp" : "Đại lý"}
              </div>
            </div>
            <div className="nameAgency">
              <label htmlFor="th" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Người đại diện</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >
                {supply.representative}
              </div>
            </div>
            <div className="groupAgency">
              <label htmlFor="nh" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Số điện thoại</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >
                {supply.providerPhone || supply.agencyPhone}
              </div>
            </div>
            <div className="groupAgency">
              <label htmlFor="dvi" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Địa chỉ</label>
              <div
                className="input_editAgency"
                style={{ display: "flex", alignItems: "center" }}
              >
                {supply.providerAddress || supply.agencyAddress}
              </div>
            </div>
            <div className="groupAgency">
              <label htmlFor="dvi" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Email</label>
              <div
                className="input_editAgency"
                style={{ display: "flex",  alignItems: "center" }}
              >
                {supply.providerEmail || supply.agencyEmail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforAgency;
