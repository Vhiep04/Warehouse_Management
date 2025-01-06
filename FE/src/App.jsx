/* eslint-disable*/
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRoutes } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ForgetPassword from './pages/auth/forgetPassword/ForgetPassword';
import ResetPassword from './pages/auth/resetPassword/ResetPassword';
import ConfirmOTP from './pages/auth/confirmOTP/ConfirmOTP';
import CreatedProduct from './pages/product/createdProduct/CreatedProduct';
import EditProduct from './pages/product/editProduct/EditProduct';
import ConfirmDeleteProduct from './components/confirmDeleteProduct/ConfirmDeleteProduct';
import ListProduct from './pages/product/listProduct/ListProduct';
import CreateAgency from './pages/agency/createdAgency/CreateAgency';
import ListAgency from './pages/agency/listAgency/ListAgency';
import InforProduct from './pages/product/inforProduct/InforProduct';
import CreatedImportSlip from './pages/importSlip/createdImportSlip/CreatedImportSlip';
import InforImportSlip from './pages/importSlip/inforImportSlip/InforImportSlip';
import CreatedExportSlip from './pages/exportSlip/createdExportSlip/CreatedExportSlip';
import InforExportSlip from './pages/exportSlip/inforExportSlip/InforExportSlip';
import ListImportSlip from './pages/importSlip/listImportSlip/ListImportSlip';
import ListExportSlip from './pages/exportSlip/listExportSlip/ListExportSlip';
import UploadProductFromLocal from './components/uploadProduct/uploadProductFromLocal/UploadProductFromLocal';
import UploadProductFromExcel from './components/uploadProduct/uploadProductFromExcel/UploadProductFromExcel';
import InforAgency from './pages/agency/editAgency/InforAgency';
import ListInventory from './pages/inventory/listInventory/ListInventory';
import CreatedInventory from './pages/inventory/createdInventory/CreatedInventory';
import IEIReport from './pages/report/IEIReport/IEIReport';
import ImportReport from './pages/report/importReport/ImportReport';
import InventoryReport from './pages/report/inventoryReport/InventoryReport';
import ReportTable from './components/reportTable/ReportTable';
import InfoInventory from './pages/inventory/infoInventory/InfoInventory';
const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgetPassword',
      element: <ForgetPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/confirm-OTP',
      element: <ConfirmOTP />
    },
    {
      path: '/created-product',
      element: <CreatedProduct />
    },
    {
      path: '/edit-product/:productId',
      element: <EditProduct />
    },
    {
      path: '/confirm-delete-product',
      element: <ConfirmDeleteProduct />
    },
    {
      path: '/list-product',
      element: <ListProduct />
    },
    {
      path: '/createAgency',
      element: <CreateAgency />
    },
    {
      path: '/list-agency',
      element: <ListAgency />
    },
    {
      path: '/inforProduct/:productId',
      element: <InforProduct />
    },
    {
      path: '/infor-agency/:type/:supplyId',
      element: <InforAgency />
    },
    {
      path: '/created-importSlip/:type',
      element: <CreatedImportSlip />
    },
    {
      path: '/infor-importSlip/:importSlipId',
      element: <InforImportSlip />
    },
    {
      path: '/list-importSlip/:type',
      element: <ListImportSlip />
    },
    {
      path: '/created-exportSlip/:type',
      element: <CreatedExportSlip />
    },
    {
      path: '/infor-exportSlip/:exportSlipId',
      element: <InforExportSlip />
    },
    {
      path: '/list-exportSlip/:type',
      element: <ListExportSlip />
    },
    {
      path: '/upload-local',
      element: <UploadProductFromLocal />
    },
    {
      path: '/upload-excel',
      element: <UploadProductFromExcel />
    },
    {
      path: '/list-inventory',
      element: <ListInventory />
    },
    {
      path: '/created-inventory',
      element: <CreatedInventory />
    },
    {
      path: '/infor-inventory/:recordInventoryId',
      element: <InfoInventory />
    },
    {
      path: '/import-export-inventory-report',
      element: <IEIReport />
    },
    {
      path: '/import-report',
      element: <ImportReport />
    },
    {
      path: '/inventory-report',
      element: <InventoryReport />
    },
    {
      path: '/report-table',
      element: <ReportTable />
    },
    {
      path: '*',
      element: <div>404: Page not found</div>
    }
  ]);
  return (
    <>
      <ToastContainer />
      {
        routes
      }
    </>
  )
}

export default App;