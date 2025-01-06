/* eslint-disable */
import React, { useEffect, useState } from 'react'

import './CreatedProduct.css';
import Header from '@/components/header/Header';
import NavBar from '@/components/navBar/NavBar';
import { readFileAsync } from '@/utils/readFile';
import { useNavigate } from 'react-router-dom';
import { createdProduct } from '@/api/productApi/product';
import { toast } from 'react-toastify';

const CreatedProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    productGroup: "",
    productMedia: [],
    productDVT: "",
    productDescription: "",
    productPrice: 0,
  });

  const [files, setFiles] = useState([]);
  const [rawFiles, setRawFiles] = useState([]);

  useEffect(() => {
    const setP = () => {
      // let code = localStorage.getItem("slProduct");
      // code = parseInt(code, 10) || 0;
      //mã code tự sinh gồm 6 số
      let code = Math.floor(Math.random() * 1000000);
      setProduct({ ...product, productCode: `hang${code}` });
    };
    setP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = async (e) => {
    const selectedFile = Array.from(e.target.files);
    const newFiles = [];
    const newRawFiles = [];

    try {
      for (const file of selectedFile) {
        const fileData = await readFileAsync(file);
        newFiles.push(fileData);
        newRawFiles.push(file);
      }

      setFiles([...files, ...newFiles]);
      setProduct({ ...product, productMedia: [...rawFiles, ...newRawFiles] });

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newRawFiles = [...rawFiles];
    newRawFiles.splice(index, 1);
    setProduct({ ...product, productMedia: newRawFiles });
  };

  const handleSubmit = async () => {
    try {
      const newProduct = await createdProduct(product);
      setProduct({
        productCode: "",
        productName: "",
        productGroup: "",
        productMedia: [],
        productDVT: "",
        productDescription: "",
        productPrice: 0,
      });

      setFiles([]);
      setRawFiles([]);

      toast.success("Thêm hàng hóa thành công");
      navigate('/list-product');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/list-product');
  };

  return (
    <div>
      <Header className="createdProduct-s0" />
      <NavBar />
      <div className='createdProduct-ss'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='createdProductheader' onClick={() => navigate('/list-product')} >Quản lý danh mục hàng hóa</p>
          <p className='createdProductheader' style={{marginLeft: '-20px'}}><i className="fa-solid fa-chevron-right"></i> Thêm hàng hóa</p>
        </div>
        <div className='createdProduct-s1'>
          <div className='createdProduct-s3'>
            <p>Thêm hàng hóa</p>
          </div>
          <div className='createdProduct-s5'>
            <span className='span'>
              Mã hàng
            </span>
            <input type="text" className='input1' name='productCode' value={product.productCode} readOnly />
          </div>
          <div className='createdProduct-s6'>
            <span className='span'>Tên hàng</span>
            <input type="text" className='input1' name='productName' value={product.productName} onChange={handleChange} />
          </div>
          <div className='createdProduct-s7'>
            <span className='span'>Nhóm hàng</span>
            <input type="text" className='input' name="productGroup" value={product.productGroup} onChange={handleChange} />
          </div>
          <div className='createdProduct-s8'>
            <p>Hình ảnh</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {files.length > 0 &&
                files.map((file, index) => (
                  <div key={index} style={{ width: '100px', height: '100px', position: 'relative' }}>
                    <img src={file} alt="product" style={{ width: '100%', height: '100px', marginTop: '20px' }} />
                    <i className="fa-sharp fa-solid fa-xmark" onClick={() => handleDeleteFile(index)} style={{ position: 'absolute', top: '14px', right: '-5px', zIndex: '10' }}></i>
                  </div>
                ))}
              <label >
                <input type="file" className='input' onChange={handleFileChange} accept='image/*' style={{ display: "none" }} multiple />
                <p className='createdProduct-s4'><i className="fa-solid fa-cloud-arrow-up fa-2xl"></i></p>
              </label>
            </div>
          </div>
          <div className='createdProduct-s6'>
            <p className='span'>Đơn vị tính</p>
            <input type="text" className='input2' name='productDVT' value={product.productDVT} onChange={handleChange} />
          </div>
          <div className='createdProduct-s6'>
            <p className='span'>Giá</p>
            <input type="number" className='input2' name='productPrice' value={product.productPrice} onChange={handleChange} />
          </div>
          <div className='createdProduct_description'>
            <p>Mô tả</p>
            <textarea name="productDescription" id="" className='createdProduct-s9' value={product.productDescription} onChange={handleChange} />
          </div>
          <div className='createdProduct-button'>
            <button type='submit' className='createdProduct-luu' onClick={handleSubmit}>Lưu</button>
            <button type='submit ' className='createdProduct-huy' onClick={handleCancel}>Hủy</button>
          </div>

        </div>
      </div>


    </div>
  )
}
export default CreatedProduct;