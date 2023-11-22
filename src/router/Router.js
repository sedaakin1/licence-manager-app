import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddCustomer from '../pages/customer/AddCustomer';
import CustomerList from '../pages/customer/CustomerList';
import Main from '../pages/main/Main';

const Router = () => {
    return (
<BrowserRouter>
<Routes>
<Route path="/customer/add" element={<AddCustomer />} />
<Route path="customer/list" element={<CustomerList />} />

<Route path='*' element={<Main />} />
</Routes>
</BrowserRouter>
    )
}
 
export default Router