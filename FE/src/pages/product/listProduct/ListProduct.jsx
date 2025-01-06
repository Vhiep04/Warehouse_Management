/* eslint-disable */
import React, { useEffect, useState } from 'react'
import Header from '@/components/header/Header'
import NavBar from '@/components/navBar/NavBar'
import { motion } from 'framer-motion'

import './ListProduct.css';
import { getProducts, searchProduct } from '@/api/productApi/product';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteProduct from '@/components/confirmDeleteProduct/ConfirmDeleteProduct';

const ListProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [slProduct, setSlProduct] = useState(0);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [type, setType] = useState("deletedProduct");
  const [deletedId, setDeletedId] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getListProducts = async () => {
      const res = await getProducts(page, limit);
      setTotal(res.totalResult);
      setSlProduct(res.totalResult);
      setListProducts(res.products);
      localStorage.setItem("slProduct", res.totalResult);
    };

    getListProducts();
  }, [page, isRefresh]);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productCode") {
      setProductCode(value);
    } else {
      setProductName(value);
    }
  };

  const handleSearch = async () => {
    try {
      setPage(1);
      const res = await searchProduct(productCode, productName, page, limit);
      setListProducts(res.products);
      setTotal(res.totalResult);
      setProductCode("");
      setProductName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAdd = () => {
    navigate("/created-product");
    // localStorage.setItem("slProduct", slProduct);
  };

  const handleClickPen = (productId) => {
    navigate(`/inforProduct/${productId}`);
  };

  const handleClickBin = (productId) => {
    setDeletedId(productId);
    setIsDeleteProduct(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteProduct(false);
  };

  return (
    <div>
      <Header className='headerListP' />
      <NavBar />
      <div className='list_body'>
        <div className='search'>
          <div className='inputInfor'>
            <div className='box'>
              <span className='ID'>Mã hàng hoá</span>
              <input type="text" className='iID' name='productCode' value={productCode} onChange={handleChange} />
            </div>
            <div className='box'>
              <span className='name'>Tên hàng hoá</span>
              <input type="text" className='iName' name='productName' value={productName} onChange={handleChange} />
            </div>
          </div>
          <button className='flpButton' onClick={handleSearch}>Tìm kiếm <i className="fa-solid fa-magnifying-glass" style={{ "color": "white" }}></i></button>
        </div>

        <button className='addButton' onClick={handleClickAdd}><i className="fa-solid fa-plus"></i>Thêm hàng hoá</button>

        <div className='listTable'>
          <table className='List'>
            <tbody>
              <tr>
                <th className='listProduct_th'>STT</th>
                <th className='listProduct_th start-l'>Tên hàng</th>
                <th className='listProduct_th'>Mã hàng</th>
                <th className='listProduct_th'>Nhóm hàng</th>
                <th className='listProduct_th'>Đơn vị tính</th>
                <th className='listProduct_th'>Đơn giá</th>
                <th className='center'>Thao tác</th>
              </tr>
              {
                listProducts.length > 0 && listProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td className='start-l'>{product.productName}</td>
                    <td>{product.productCode}</td>
                    <td>{product.productGroup}</td>
                    <td>{product.productDVT}</td>
                    <td>{product.productPrice}</td>
                    <td className='purple'>
                      <span className='pen' onClick={() => handleClickPen(product._id)}><i className="fa-solid fa-pen"></i></span>
                      <span className='bin' onClick={() => handleClickBin(product._id)}><i className="fa-solid fa-trash"></i></span></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Pagination
            total={total}
            pageSize={limit}
            current={page}
            onChange={handleChangePage}
            style={{ "position": "absolute", "bottom": "50px", "right": "50px", "position": "fixed" }}
          />
        </div>

      </div>
      {
        isDeleteProduct && (
          <div className='overlay' onClick={handleCancelDelete}>
            <motion.div
              className='itemDelete'
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct type={type} onCancel={handleCancelDelete} id={deletedId} isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            </motion.div>
          </div>
        )
      }
    </div>
  )
}

export default ListProduct;