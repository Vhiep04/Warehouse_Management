/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { formatCurrency } from '@/utils/funtion/slipFuntion';
import Header from '@/components/header/Header'
import NavBar from '@/components/navBar/NavBar'
import UploadProductFromLocal from '@/components/uploadProduct/uploadProductFromLocal/UploadProductFromLocal';
import { searchSupply } from '@/api/suppliesAPI/supply';
import { createdContract } from '@/api/contractApi/contract';
import { createdImportSlip } from '@/api/importSlipApi/importSlip';

import './CreateImportSlip.css';
const CreatedImportSlip = () => {
  const { type } = useParams();
  const [showUploadFromLocal, setShowUploadFromLocal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [listProvider, setListProvider] = useState([]);
  const [providerInfor, setProviderInfor] = useState({
    providerCode: "",
    providerPhone: "",
    providerAddress: "",
  });
  const [isRefresh, setIsRefresh] = useState(false);

  const user = useSelector((state) => state.user);
  const [newImportSlip, setNewImportSlip] = useState({
    importSlipCode: `PNK${Math.floor(Math.random() * 1000000)}`,
    providerId: "",
    userId: user._id,
    status: "PENDING",
    products: [],
    newProducts: [],
    contracts: "",
    type: type,
    reason: "",
    importPrice: "0",
  });

  const [contract, setContract] = useState({
    contractContent: "",
    contractMedia: [],
  });

  const navigate = useNavigate();

  const handleCancelUploadLocal = () => {
    setShowUploadFromLocal(false);
  };

  useEffect(() => {
    const getProvider = async () => {
      let res;
      if (type === "Provider") {
        res = await searchSupply("", "", "", "provider", 1, 100);
      } else {
        if (type === "Agency") {
          res = await searchSupply("", "", "", "agency", 1, 100);
        }
      }
      setListProvider(res.supplies);
    };

    getProvider();
  }, []);

  useEffect(() => {
    setNewImportSlip({
      ...newImportSlip,
      products: selectedProducts.map((product) => ({ productId: product._id, quantity: 0, discount: 0 })),
    });
  }, [isRefresh]);

  const handleChangeProvider = (e) => {
    const { name, value } = e.target;
    setNewImportSlip({ ...newImportSlip, [name]: value });

    const provider = listProvider.find((p) => p._id === value);
    if (provider) {
      setProviderInfor({
        providerCode: provider.providerCode || provider.agencyCode,
        providerPhone: provider.providerPhone || provider.agencyPhone,
        providerAddress: provider.providerAddress || provider.agencyAddress,
      });
    }
  };

  const handleChangeField = (e, productId) => {
    const { name, value } = e.target;

    if (name === 'quantity') {
      setNewImportSlip(prev => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, quantity: parseInt(value) || 0 }
          }
          return p;
        })
      }))
    }

    if (name === 'discount') {
      const discountValue = value.replace('%', '');
      const newDiscount = parseInt(discountValue) || 0;
      setNewImportSlip(prev => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, discount: newDiscount }
          }
          return p;
        })
      }))
    }
  };
  const calculateLineTotal = (product) => {
    const item = newImportSlip.products.find((p) => p.productId === product._id);
    if (item) {
      return +product.productPrice * item.quantity * (1 - item.discount / 100);

    } else {
      return 0;
    }
  };

  const calculateTotalPrice = useMemo(() => {
    return newImportSlip.products.reduce((total, product) => {
      const productPrice = selectedProducts.find((p) => p._id === product.productId)?.productPrice;
      return total + +productPrice * product.quantity * (1 - product.discount / 100);
    }, 0);
  }, [newImportSlip.products, selectedProducts]);

  useEffect(() => {
    setNewImportSlip(prev => ({
      ...prev,
      importPrice: `${calculateTotalPrice}`
    }));
  }, [calculateTotalPrice]);

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    const newRawFile = [...contract.contractMedia, ...selectedFile];
    setContract({ ...contract, contractMedia: newRawFile });
    setFileNames([...fileNames, ...selectedFile.map((file) => file.name)]);
  };

  const handleChangeFileNameContract = (e) => {
    const updateFileNames = e.target.value.split(', ').map((name) => name);
    const removeFiles = fileNames.filter((name) => !updateFileNames.includes(name));

    const updateContractMedia = contract.contractMedia.filter((file) => !removeFiles.includes(file.name));
    setContract({ ...contract, contractMedia: updateContractMedia });
  };

  const handleSubmit = async () => {
    try {
      const newContract = await createdContract(contract);
      const data = {
        ...newImportSlip,
        contracts: newContract.newContract._id,
      };
      if (!data.newProducts || data.newProducts.length === 0) {
        delete data.newProducts;
      }

      await createdImportSlip(data);
      toast.success('Tạo phiếu nhập kho thành công');
      navigate(`/list-importSlip/${type}`);
    } catch (error) {
      console.log(error);
      toast.error('Tạo phiếu nhập kho thất bại');
    }
  };

  const handleCancelCreateImportSlip = () => {
    navigate(`/list-importSlip/${type}`);
  };
  return (
    <div>
      <Header className='headerListP' />
      <NavBar />
      <div className='cis-body'>
        <div className='cis-address'>
          <span onClick={() => navigate(`/list-importSlip/${type}`)}>
            Xuất-nhập với {(type === "Provider" && "NCC") || (type === "Agency" && "Nội bộ")}</span>
          &gt; Tạo mới phiếu nhập kho
        </div>
        <div className='cis-addbutton'>
          <button>+Thêm hàng từ File ngoài</button>
          <button onClick={() => setShowUploadFromLocal(true)}>+Thêm hàng từ hệ thống</button>
        </div>
        <div className='cis-frame'>
          <div className='cis-title'>PHIẾU NHẬP KHO</div>
          <div className='cis-info'>
            <div className='i-title'>Thông tin chung</div>
            <div className='i-line1'>
              <div className='i-o'>
                <div className='i-name'>Nguồn xuất</div>
                <select name="providerId" id="source" onChange={handleChangeProvider}>
                  <option value=""> -Chọn nguồn- </option>
                  {
                    listProvider.length > 0 && listProvider.map((provider) => (
                      <option key={provider._id} value={provider._id} >{provider.providerName || provider.agencyName}</option>
                    ))
                  }
                </select>
              </div>
              <div className='i-o'>
                <div className='i-name'>Mã phiếu</div>
                <input name="idslip" id="idslip" style={{ width: "100%", height: "40px", paddingLeft: "10px" }} value={newImportSlip.importSlipCode} readOnly />
              </div>
            </div>
            <div className='i-line2'>
              <div className='i-o'>
                <div className='i-name'>Mã nguồn</div>
                <input style={{ width: "100%", height: "40px", paddingLeft: "10px" }} name="providerCode" id="idsource" value={providerInfor.providerCode} readOnly />
              </div>
              <div className='i-o'></div>
            </div>
            <div className='i-line3'>
              <div className='i-o'>
                <div className='i-name'>Số điện thoại</div> <input type="text" value={providerInfor.providerPhone} readOnly />
              </div>
              <div className='i-o'></div>
            </div>
            <div className='i-line4'>
              <div className='i-o'>
                <div className='i-name'>Địa chỉ</div><textarea name="s-address" id="s-address" cols={50} rows={3} value={providerInfor.providerAddress} readOnly></textarea>
              </div>
              <div className='i-o'>
                <div className='i-name'>Lý do nhập</div><textarea name="reason" value={newImportSlip.reason} onChange={(e) => setNewImportSlip({ ...newImportSlip, reason: e.target.value })} id="reasons" cols={50} rows={3}></textarea>
              </div>
            </div>
          </div>
          <div className='cis-table'>
            <table className='cis-data'>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Tên hàng hoá </th>
                  <th>Mã hàng </th>
                  <th>Đơn vị tính </th>
                  <th>Đơn giá </th>
                  <th>Số lượng </th>
                  <th>Chiết khấu </th>
                  <th>Thành tiền </th>
                  <th>Xoá </th>
                </tr>
                {
                  selectedProducts.length > 0 && selectedProducts.map((product, index) => (
                    <tr className='list-item-product' key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.productCode}</td>
                      <td>{product.productDVT}</td>
                      <td>{formatCurrency(product.productPrice)}</td>
                      <td>
                        <input
                          type='number'
                          name='quantity'
                          onChange={(e) => handleChangeField(e, product._id)}
                          style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: "none" }}
                          placeholder='nhập số lượng'
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          name='discount'
                          onChange={(e) => handleChangeField(e, product._id)}
                          style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: "none" }}
                          placeholder='nhập % chiết khấu'
                        />
                      </td>
                      <td>{formatCurrency(calculateLineTotal(product))}</td>
                      <td><i className="fa-solid fa-trash"></i> </td>
                    </tr>
                  ))
                }
                <tr>
                  <td colSpan={7}>Tổng</td>
                  <td colSpan={2} >{formatCurrency(calculateTotalPrice)}</td>
                </tr>
              </tbody>

            </table>
          </div>

          <div className='cis-contract'>
            <div className='c-title'>
              <div>
                <i className="fa-solid fa-file-contract"></i>
              </div>
              <div>Hợp đồng</div>
            </div>
            <div className='c-input'>
              <div className='cip'>
                <div className='a'>
                  Nội dung
                </div>
                <div className='b'>
                  <input type="text" onChange={(e) => setContract({ ...contract, contractContent: e.target.value })} />
                </div>
              </div>
              <div className='cip'>
                <div className='a'>Hình ảnh </div>
                <div className='b'>
                  <input type="url" value={fileNames.join(', ')} onChange={(e) => handleChangeFileNameContract(e)} />
                  <div className='cicon'>
                    <label>
                      <input type="file" accept='image/*' style={{ display: "none" }} multiple onChange={handleFileChange} />
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='cis-contract'>
            <div className='c-title'><div><i className="fa-solid fa-expand"></i></div><div>Sở cứ</div></div>
            <div className='c-input'>
              <div className='cip'><div className='a'>Nội dung</div> <div className='b'><input type="text" /></div></div>
              <div className='cip'><div className='a'>Hình ảnh </div><div className='b'><input type="url" /> <div className='cicon'><i className="fa-solid fa-cloud-arrow-up"></i></div></div></div>
            </div>
          </div> */}

          <div className='cis-button'>
            <button className='cis-cancel' onClick={handleCancelCreateImportSlip}>Huỷ</button>
            <button className='cis-save' type='submit' onClick={handleSubmit}>Lưu</button>
          </div>
        </div>
      </div>

      {showUploadFromLocal && (
        <div className='overlay' onClick={handleCancelUploadLocal}>
          <motion.div
            className='item-upload'
            onClick={(e) => e.stopPropagation()}
            animate={{ opacity: 1, scal: 1 }}
            initial={{ opacity: 0, scal: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <UploadProductFromLocal onCancel={handleCancelUploadLocal} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CreatedImportSlip;