import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import AllOrders from "./AllOrders";
import AssignDelivery from "./AssignDelivery";
const AdminPage = () => {
  const { adminName } = useParams();
  const [showCategory, setShowCategory] = useState(false);
  const[showAddProduct, setShowAddProduct] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const[showDelivery, setShowDelivery] = useState(false);
  //const [category, setCategory] = useState([]);

  const handleAddCategoryClick = () => {
    setShowCategory(true);
    setShowAddProduct(false);
    setShowAllOrders(false);
    setShowDelivery(false);
  };

  const handleAddProductClick  = () =>{
    setShowAddProduct(true);
    setShowCategory(false);
    setShowAllOrders(false);
    setShowDelivery(false);
  }

  const handleAllOrdersClick = () =>{
    setShowAllOrders(true);
    setShowAddProduct(false);
    setShowCategory(false);
    setShowDelivery(false);
  }

  const handleAssignDeliveryClick = () =>{
    setShowAllOrders(false);
    setShowAddProduct(false);
    setShowCategory(false);
    setShowDelivery(true);
  }

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="image-Container">
          <img className="image" src="/image/1.jpg" width="50px" alt="Logo" />
        </div>
        <div className="navbar-1-Login">
          <Link to="/">Online Shopping</Link>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
        </div>
        <div className="navbar-2-Login">
          <Link
            to={`/adminPage/${adminName}/addCategory`}
            onClick={handleAddCategoryClick}
          >
            Add Category
          </Link>
          <Link to={`/adminPage/${adminName}/addProduct`} onClick={handleAddProductClick}>Add Product</Link>
          <Link to={`/adminPage/${adminName}/allOrders`} onClick={handleAllOrdersClick}>All Orders</Link>
          <Link to={`/adminPage/${adminName}/assignDelivery`} onClick={handleAssignDeliveryClick}>Assign Order Delivery</Link>
          <Link to={`/`}>Logout</Link>
        </div>
      </div>

      {showCategory && <AddCategory />}

      {showAddProduct && <AddProduct />}

      {showAllOrders && <AllOrders/>}

      {showDelivery &&<AssignDelivery/>}
    </React.Fragment>
  );
};

export default AdminPage;
