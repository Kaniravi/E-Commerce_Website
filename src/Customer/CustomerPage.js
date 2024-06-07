import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayAllProducts from "../DisplayAllProducts";
import DisplayProducts from "../DisplayProducts";
import Cart from "./Cart";
import CartList from "./CartList";

const CustomerPage = () => {
  const { customerName } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  console.log(customerName);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getCategory`);
        console.log(response.data);
        setCategories(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchCategories();
  }, []);

  const handleFetchClick = (id) => {
    if (selectedCategoryId === id && showCategory) {
      setSelectedCategoryId(null);
      setShowCategory(false);
      setShowAllProducts(false);
      setShowCart(false);
      setShowOrder(false);
    } else {
      setSelectedCategoryId(id);
      setShowCategory(true);
      setShowAllProducts(false);
      setShowCart(false);
      setShowOrder(false);
    }
  };

  const handleFetchAllProductClick = () => {
    setShowAllProducts(!showAllProducts);
    setShowCategory(false);
    setShowCart(false);
    setShowOrder(false);
  };

  const handleCartClick = () => {
    setShowAllProducts(false);
    setShowCategory(false);
    setShowCart(true);
    setShowOrder(false);
  };

  const handleOrderClick = () =>{
    setShowAllProducts(false);
    setShowCart(false);
    setShowCategory(false);
    setShowOrder(true);
  }

  return (
    <React.Fragment>
      <div className="homeForm">
        <div className="homeContainer">
          <div className="navbar">
            <div className="image-Container">
              <img className="image" src="../image/1.jpg" width="50px" alt="Logo" />
            </div>
            <div className="navbar-1">
              <Link to={`/`}>Online Shopping</Link>
              <a href="#">Contact Us</a>
              <a href="#">About Us</a>
            </div>
            <div className="navbar-2">
              <Link to={`/customerPage/${customerName}/myCart`} onClick={handleCartClick}>My Cart</Link>
              <Link to={`/customerPage/${customerName}/myOrder`} onClikc={handleOrderClick}>My Order</Link>
              <Link to="/">Logout</Link>
            </div>
          </div>
          <div className="corner top-left"></div>
          <hr className="hr-line"></hr>
          <h3>Best Place <br />For <br /><span className="heading rotate">Online Shopping</span></h3>
          <div className="corner top-right"></div>
          <img className="imageTop" src="../image/2.jpg" width="30%" alt="Top Image" />
          <img className="imageSide" src="../image/3.jpg" width="20%" alt="Side Image" />
          <div className="corner bottom-left"></div>
          <hr className="hr-bottom"></hr>
          <div className="corner bottom-right"></div>
        </div>
        <div className="sidebar" id="sidebar">
          <div className="sideHeadBorder">
            <button onClick={() => { toggleSidebar(); handleFetchAllProductClick(); }} className="sideHead">All Categories</button>
          </div>
          <div className={sidebarOpen ? "category-links active" : "category-links"}>
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`/customerPage/${customerName}`} className="sideLinks" onClick={() => { handleFetchClick(category.id); }}>
                  {category.categoryTitle}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
      {selectedCategoryId && showCategory && <DisplayProducts id={selectedCategoryId} customerName={customerName} />}
      {showAllProducts && <DisplayAllProducts customerName={customerName} />}
      {showCart && <Cart />}
      {showOrder && <CartList />}
    </React.Fragment>
  );
};

export default CustomerPage;
