import Home from './Home';

import Register from './Register';
import Login from './Login';
import AdminPage from './Admin/AdminPage';
import Cart from './Customer/Cart';
import CartList from './Customer/CartList';
import AddCategory from './Admin/AddCategory';
import AllOrders from './Admin/AllOrders';
import CustomerPage from './Customer/CustomerPage';
import MyOrders from './DeliveryPerson/MyOrders';
import DeliveryPersonPage from './DeliveryPerson/DeliveryPersonPage';
import './App.css';
import {BrowserRouter as  Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
   <Router>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route path="/userRegister" element={<Register/>}></Route>
    <Route path="/userLogin" element={<Login/>}></Route>
    <Route path="/adminPage/:adminName" element={<AdminPage/>}/>
    <Route path="/adminPage/:adminName/addCategory" element={<AdminPage/>}/>
    <Route path="/adminPage/:adminName/addProduct" element={<AdminPage/>}/>
    <Route path="/customerPage/:customerName" element={<CustomerPage/>}/>
    <Route path="/customerPage" element={<CustomerPage/>}/>
    <Route path="/customerPage/:customerName/product/:id/category/:categoryId" element ={<Cart/>}/>
    <Route path="/customerPage/:customerName/myCart" element={<CartList />} />
    <Route path="/customerPage/:customerName/myOrder" element={<CartList/>}/>
    <Route path="/customerPage/:customerName/product/:id" element={<CartList/>}/>
    <Route path="/product/:id" element={<CartList/>} />
    <Route path="/product/:id/category/:categoryId" element={<Cart/>}/>
    <Route path="/customerPage/:customerName/product/:id/category/:categoryId" element={<Cart />} />
    <Route path="/customerPage/:customerName/myCart/product/:id/category/:categoryId" element={<CartList/>}/>
    <Route path="/adminPage/:adminName/allOrders" element={<AdminPage/>}/>
    <Route path="/adminPage/:adminName/assignDelivery" element={<AdminPage/>}/>
    <Route path="/deliveryPersonPage/:deliveryPersonName" element={<DeliveryPersonPage/>}/>
    <Route path="/deliveryPersonPage/:deliveryPersonName/myOrders" element={<MyOrders/>}/>
    <Route path="/deliveryPersonPage/:deliveryPersonName/updateOrders" element={<MyOrders/>}/>
    <Route path="/deliveryPersonPage" element={<DeliveryPersonPage/>}/>
    </Routes>
   </Router>
  );
}

export default App;
