import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayProducts from "./DisplayProducts";
import DisplayAllProducts from "./DisplayAllProducts";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

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
   if(selectedCategoryId === id && showCategory){
    setSelectedCategoryId(null);
    showCategory(false);
    setShowAllProducts(!showAllProducts);
   }
   else{
    setSelectedCategoryId(id);
     setShowCategory(true);
    setShowAllProducts(false);
   }
  };

  const handleFetchAllProductClick = () => {
    setShowAllProducts(!showAllProducts);
    setShowCategory(false);
  };


 
  return (
    <React.Fragment>
      <div className="homeForm">
        <div className="homeContainer">
          <div className="navbar">
            <div className="image-Container">
              <img className="image" src="./image/1.jpg" width="50px" alt="Logo" />
            </div>
            <div className="navbar-1">
              <a href="#">Online Shopping</a>
              <a href="#">Contact Us</a>
              <a href="#">About Us</a>
            </div>
            <div className="navbar-2">
              <Link to="/userRegister">Register User</Link>
              <Link to="/userLogin">Login User</Link>
            </div>
          </div>
          <div className="corner top-left"></div>
          <hr className="hr-line"></hr>
          <h3>Best Place <br />For <br /><span className="heading rotate">Online Shopping</span></h3>
          <div className="corner top-right"></div>
          <img className="imageTop" src="./image/2.jpg" width="30%" alt="Top Image" />
          <img className="imageSide" src="./image/3.jpg" width="20%" alt="Side Image" />
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
              <li key={index}><Link to={`/`} className="sideLinks" onClick={(e) => { handleFetchClick(category.id); }}>{category.categoryTitle}</Link></li>
            ))}
          </div>
        </div>
      </div>
      {selectedCategoryId && showCategory && <DisplayProducts id={selectedCategoryId} />}
      {showAllProducts && <DisplayAllProducts />}
    </React.Fragment>
  );
};

export default Home;
