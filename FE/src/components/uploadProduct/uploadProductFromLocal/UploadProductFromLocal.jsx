/* eslint-disable */
import React, { useEffect, useState } from 'react'

import './UploadProductFromLocal.css';
import { getProducts, searchProduct } from '@/api/productApi/product';
import { Pagination } from 'antd';
const UploadProductFromLocal = ({ onCancel, selectedProducts, setSelectedProducts, isRefresh, setIsRefresh }) => {
  const [listProduct, setListPoroduct] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');

  useEffect(() => {
    const getListProduct = async () => {
      const res = await getProducts(page, limit);
      setTotal(res.totalResult);
      setListPoroduct(res.products);

      const all = await getProducts(1, res.totalResult);
      setAllProducts(all.products);
    };

    getListProduct();
  }, [page]);

  const handleChangeCheckBox = (product) => {
    setSelectedProducts((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      }
      else {
        return [...prev, product];
      }
    });
  };

  const handleClickAll = async () => {
    if (selectedProducts.length === total) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(allProducts);
    }
  };

  const handleClickAdd = () => {
    setIsRefresh(!isRefresh);
    onCancel();
  };

  const handleClickCancel = () => {
    setSelectedProducts([]);
    setIsRefresh(!isRefresh);
    onCancel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductName(value);
    } else {
      setProductCode(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setProductCode('');
      setProductName('');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchProduct(productCode, productName, page, limit);
      console.log('res', res);
      setListPoroduct(res.products);
    } catch (error) {
      console.log('error', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  return (
    <div className='container_uplocal'>
      <div className='h1_uplocal'>
        <p>DANH SÁCH HÀNG HÓA</p>
      </div>
      <div className='list_bodyuplocal'>
        <div className='searchuplocal'>
          <div className='inputInforuplocal'>
            <div className='boxuplocal'>
              <span className='nameuplocal'>Tên hàng hoá</span>
              <input type="text" className='iNameuplocal' name='productName' value={productName} onChange={handleChange} onKeyDown={handleKeyDown} />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className='boxuplocal'>
              <span className='IDuplocal'>Mã hàng hoá</span>
              <input type="text" className='iIDuplocal' name='productCode' value={productCode} onChange={handleChange} onKeyDown={handleKeyDown} />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className='listTableuplocal' >
          <div className='lb_up'>
            <label htmlFor="" className='lb_upload'>{selectedProducts.length} mặt hàng được chọn</label>
            <input className='box_chose' type="checkbox" name="" id="" onChange={handleClickAll} />
          </div>
          <table className='Listuplocal'>
            <tbody>
              <tr >
                <th className='centeruplocal'>STT</th>
                <th className='centeruplocal'>Tên hàng hoá</th>
                <th className='centeruplocal'>Mã hàng</th>
                <th className='centeruplocal'>Đơn vị tính</th>
                <th className='centeruplocal'>Số lượng <div>trong kho</div></th>
                <th className='centeruplocal'>Đơn giá</th>
                <th className='centeruplocal'>Chọn</th>
              </tr>
              {
                listProduct.length > 0 && listProduct.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.productCode}</td>
                    <td>{product.productDVT}</td>
                    <td>{product.productQuantityRemaining}</td>
                    <td>{formatCurrency(product.productPrice)}</td>
                    <td className='choseuplocal'>
                      <input
                        className='box_chose'
                        type="checkbox" name="" id=""
                        checked={selectedProducts.some((item) => item._id === product._id)}
                        onChange={() => handleChangeCheckBox(product)}
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className='foot'></div>
          <div className='fot_up'>
            <Pagination
              pageSize={limit}
              total={total}
              current={page}
              onChange={(page) => setPage(page)}

            />
          </div>
        </div>
        <div className='b_uplocatol'>
          <button className='b1_uplocatol' type='button' onClick={handleClickCancel}>Hủy</button>
          <button className='b2_uplocatol' type="submit" onClick={handleClickAdd}>Thêm</button>
        </div>
      </div>
    </div >
  )
}

export default UploadProductFromLocal;