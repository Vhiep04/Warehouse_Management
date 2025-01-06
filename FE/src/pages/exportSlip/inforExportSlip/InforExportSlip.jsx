/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "@/components/navBar/NavBar";
import Header from "@/components/header/Header";
import { getExportSlipById } from "@/api/exportSlipApi/exportSlip";
import { formatCurrency, formatDate } from "@/utils/funtion/slipFuntion";

import "./InforExportSlip.css";

const InforExportSlip = () => {
  const [exportSlip, setExportSlip] = useState({});
  const [type, setType] = useState("");

  const { exportSlipId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const getExportSlip = async () => {
      const res = await getExportSlipById(exportSlipId);
      if (res.exportSlip.agencyId?._id) {
        setType("Agency");
      } else {
        if (res.exportSlip.providerId?._id) {
          setType("Provider");
        }
      }
      console.log(res.exportSlip);
      setExportSlip(res.exportSlip);
    };

    getExportSlip();
  }, [exportSlipId]);

  const calculateLineTotal = (product) => {
    return (
      product.productId?.productPrice *
      product.quantity *
      (1 - product.discount / 100)
    );
  };

  return (
    <div>
      <Header className="Header" />
      <NavBar />

      {/* <div className="export-slip-page"> */}

      <div className="export-slip-container">
        <div className="main-content">
          <div className="export-header">
            <h3>PHIẾU XUẤT KHO</h3>
            <span
              className="close-btn"
              onClick={() => navigate(`/list-exportSlip/${type}`)}
            >
              X
            </span>
          </div>

          <div className="form-container">
            <div className="form-header">
              <h4>Thông tin chung </h4>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Nguồn nhận</label>
                <input
                  type="text"
                  value={
                    (type === "Provider" &&
                      exportSlip.providerId?.providerName) ||
                    (type === "Agency" && exportSlip.agencyId?.agencyName)
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Mã phiếu</label>
                <input type="text" value={exportSlip.exportSlipCode} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mã nguồn</label>
                <input
                  type="text"
                  value={
                    (type === "Provider" &&
                      exportSlip.providerId?.providerCode) ||
                    (type === "Agency" && exportSlip.agencyId?.agencyCode)
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                {/* <label>Xuất tại kho</label>
                <input type="text" value="Kho tổng" readOnly /> */}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  value={
                    (type === "Provider" &&
                      exportSlip.providerId?.providerPhone) ||
                    (type === "Agency" && exportSlip.agencyId?.agencyPhone)
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                {/* <label>Mã kho</label>
                <input type="text" value="KT_5467" readOnly /> */}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={
                    (type === "Provider" &&
                      exportSlip.providerId?.providerAddress) ||
                    (type === "Agency" && exportSlip.agencyId?.agencyAddress)
                  }
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Lý do</label>
                <input type="text" value={exportSlip.reason} readOnly />
              </div>
            </div>
          </div>

          <div className="products-container">
            <table className="List_infim">
              <tbody>
                <tr className="tr_infim">
                  <th className="centerinfim">STT</th>
                  <th className="centerinfim">Tên hàng hoá</th>
                  <th className="centerinfim">Mã hàng</th>
                  <th className="centerinfim">
                    Đơn vị <div>tính</div>
                  </th>
                  <th className="centerinfim">Đơn giá</th>
                  <th className="centerinfim">
                    Số<div>Lượng</div>
                  </th>
                  <th className="centerinfim">Chiết khấu</th>
                  <th className="centerinfim">Thành tiền</th>
                </tr>
                {exportSlip.products?.length > 0 &&
                  exportSlip.products.map((product, index) => (
                    <tr className="tr_infim" key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.productId?.productName}</td>
                      <td>{product.productId?.productCode}</td>
                      <td>{product.productId?.productDVT}</td>
                      <td>
                        {formatCurrency(product.productId?.productPrice || 0)}
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.discount} %</td>
                      <td>{formatCurrency(calculateLineTotal(product))}</td>
                    </tr>
                  ))}
                <tr className="tr_infim">
                  <th className="sum_inf_1" colSpan={7}>
                    Tổng
                  </th>
                  <th className="sum_inf_2">
                    {formatCurrency(exportSlip.exportPrice)}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="contract-section">
            <h4>Hợp đồng</h4>
            <div className="contract-previews">
              {exportSlip.contracts?.contractMedia.length > 0 &&
                exportSlip.contracts?.contractMedia.map(
                  (contractMedia, index) => (
                    <img
                      className="img_contract"
                      src={contractMedia}
                      alt=""
                      key={index}
                    />
                  )
                )}
            </div>
          </div>
        </div>

        <div className="status-panel">
          <div className="status-header">
            <h4>Tình trạng</h4>
          </div>
          <div className="status-group">
            <div className="status-label">
              Tạo bởi <button className="status-btn delete">Xóa</button>
            </div>

            <div className="status-info">
              <input type="text" value={exportSlip.userId?.fullName} readOnly />
            </div>
            <div className="status-info">
              <input type="text" value={formatDate(exportSlip.createdAt)} />
            </div>
          </div>

          <div className="status-group">
            <div className="status-label">
              Duyệt bởi <button className="status-btn approve">Duyệt</button>{" "}
            </div>

            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "CONFIRMED" &&
                  exportSlip.userEditStatus?.fullName) || ""
                }
                readOnly
              />
            </div>
            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "CONFIRMED" &&
                  formatDate(exportSlip.updatedAt)) || ""
                }
                readOnly
              />
            </div>
          </div>

          <div className="status-group">
            <div className="status-label">
              Từ chối bởi <button className="status-btn reject">Từ chối</button>
            </div>

            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "REJECTED" &&
                    exportSlip.userEditStatus?.fullName) ||
                  ""
                }
                readOnly
              />
            </div>
            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "REJECTED" &&
                  formatDate(exportSlip.updatedAt)) || ""
                }
                readOnly
              />
            </div>
          </div>

          <div className="status-group">
            <div className="status-label">
              Đã xuất bởi{" "}
              <button className="status-btn exported" disabled>
                Đã xuất
              </button>
            </div>

            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "DONE" &&
                  exportSlip.userEditStatus?.fullName) || ""
                }
                readOnly
              />
            </div>
            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "DONE" &&
                  formatDate(exportSlip.updatedAt)) || ""
                }
                readOnly
              />
            </div>
          </div>

          <div className="status-group">
            <div className="status-label">
              Hoàn hàng bởi
              <button className="status-btn return">Hoàn hàng</button>
            </div>

            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "RETURNED" &&
                  exportSlip.userEditStatus?.fullName) || ""
                }
                readOnly
              />
            </div>
            <div className="status-info">
              <input
                type="text"
                value={
                  (exportSlip.status === "RETURNED" &&
                  formatDate(exportSlip.updatedAt)) || ""
                }
                readOnly
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default InforExportSlip;
