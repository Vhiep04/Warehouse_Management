/* eslint-disable */
import React from 'react'

import './UploadProductFromExcel.css';
const UploadProductFromExcel = () => {
  return (
    <div className='upEbody'>
      <div className='upEframe'>
        <div className='upEtitle'>
         THÊM DANH SÁCH HÀNG HOÁ FILE NGOÀI
        </div>
        <div className='upEborder'>
          <div className='upEcloud'><i class="fa-solid fa-cloud-arrow-up"></i></div>
          <div className='upEcontent'>Kéo thả file vào đây</div>
          <div className='upEchoose'>hoặc</div>
          <div className='upEbutton'><button>Chọn File</button></div>
        </div>
        <div className='upEcancel'><button>Huỷ</button></div>
      </div>
    </div>
  )
}

export default UploadProductFromExcel;