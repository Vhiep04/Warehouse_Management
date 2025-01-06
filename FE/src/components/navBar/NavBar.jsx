/* eslint-disable */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  return (
    <>
      <div className="Frame">
        <div className="Content">
          <div className="Avatar">
            <img src={user.avatar} alt="avatar" className="navBar-avatar" />
            <p>
              <b>{user.userName}</b>
            </p>
          </div>

          <div className="Separate">
            <hr />
          </div>

          <div className="Menu">
            <div className="p1">
              <p onClick={() => navigate("/")}>
                <i className="fa-solid fa-chart-pie"></i>Tổng quan
              </p>
            </div>

            <div className="p1">
              {/* xuat khi hang loi */}
              <p>
                <i className="fa-solid fa-clipboard"></i>Xuất - nhập với NCC
              </p>
              <div className="p2">
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Xuất kho{" "}
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div
                  className="p3"
                  onClick={() => navigate("/list-exportSlip/Provider")}
                >
                  <p>Phiếu xuất kho</p>
                </div>
              </div>
              <div className="p2">
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Nhập kho{" "}
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div className="p3">
                  <p onClick={() => navigate(`/list-importSlip/Provider`)}>
                    Phiếu nhập kho
                  </p>
                </div>
              </div>
            </div>

            <div className="p1">
              {/* xuat khi hang loi */}
              <p>
                <i className="fa-solid fa-clipboard"></i>Xuất - nhập với Nội bộ
              </p>
              <div className="p2">
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Xuất kho{" "}
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div className="p3">
                  <p>Lệnh xuất kho</p>
                  <p onClick={() => navigate("/list-exportSlip/Agency")}>
                    Phiếu xuất kho
                  </p>
                </div>
              </div>
              <div className="p2">
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Nhập kho{" "}
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div className="p3">
                  <p>Lệnh nhập kho</p>
                  <p onClick={() => navigate(`/list-importSlip/Agency`)}>
                    Phiếu nhập kho
                  </p>
                </div>
              </div>
            </div>

            <div className="p1">
              <p>
                <i className="fa-solid fa-clipboard"></i>Xuất - nhập với NVBH
              </p>
              <div className="p2">
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Xuất kho{" "}
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div
                  className="p3"
                  onClick={() => navigate("/list-exportSlip/Customer")}
                >
                  <p>Phiếu xuất kho</p>
                </div>
              </div>
              <div className="p2">
                <p>
                  <i className="fa-solid fa-chevron-right"></i>
                  Nhập kho
                  <span className="p4">
                    <i className="fa-solid fa-minus"></i>
                  </span>
                </p>
                <div className="p3">
                  <p onClick={() => navigate(`/list-importSlip/Customer`)}>
                    Phiếu nhập kho
                  </p>
                </div>
              </div>
            </div>

            <div className="p1">
              <p onClick={() => navigate("/list-inventory")}>
                <i className="fa-solid fa-check"></i>Quản lý kiểm kê
              </p>
            </div>

            <div className="p1">
              <p>
                <i className="fa-solid fa-chart-simple"></i>Báo cáo thống kê
              </p>
              <div className="p2">
                <p onClick={() => navigate("/import-report")}>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Báo cáo nhập kho
                </p>
                <p onClick={() => navigate("/inventory-report")}>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Báo cáo tồn kho
                </p>
                <p onClick={() => navigate("/import-export-inventory-report")}>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Báo cáo xuất nhập
                  tồn
                </p>
              </div>
            </div>

            <div className="p1">
              <p>
                <i className="fa-solid fa-book"></i>Danh mục
              </p>
              <div className="p2">
                <p onClick={() => navigate("/list-agency")}>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Nguồn hàng
                  xuất/nhập
                </p>
                <p onClick={() => navigate("/list-product")}>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Danh mục hàng hoá
                </p>
                <p>
                  {" "}
                  <i className="fa-solid fa-chevron-right"></i>Hợp đồng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
