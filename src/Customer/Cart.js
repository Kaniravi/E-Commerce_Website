import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayProducts from "../DisplayProducts";
import CustomerPage from "./CustomerPage";
import CartList from "./CartList";

const initialState = {
  productImage: "null",
  productTitle: "",
  productDescription: "",
  productQuantity: ""
};

const Cart = () => {
  const navigate = useNavigate();
  const {customerName} = useParams();
  const {id} = useParams();
  const {categoryId} = useParams();

  const [product, setProduct] = useState(initialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [sideHeader, setSideHeader] = useState(false);
  const [showProduct, setShowProduct] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [quantity, setQuantity] = useState();
  const [products,setProducts] = useState();
 
  const [cart, setCart] = useState({
    productImage: "null",
    productTitle: "",
    productDescription: "",
    productQuantity: 0,
    productSelectedQuantity:"",
    productPrice:0,
    customerName: customerName // Initialize customerName from route params
  });

  useEffect(() => {
    if (customerName) {
      setCart((prevCart) => ({ ...prevCart, customerName }));
    }
  }, [customerName]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getCategory`);
        setCategories(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Kani");
        console.log(id);
        const response = await axios.get(`http://localhost:8080/customer/fetchCategory/${id}`);
        setProduct(response.data);
        setCart((prevCart) => ({
          ...prevCart,
          ...response.data,
          customerName: customerName // Ensure customerName is retained
        }));
        console.log(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchProduct();
  }, [id, customerName]);

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/customer/getCategory/${product.category}`);
        console.log(response.data);
        setProductCategories(response.data.filter(p => (p.id).toString() !== (id)));
      } catch (e) {
        console.log("Error", e);
      }
    };
    if (product.category) {
      fetchAllCategory();
    }
  }, [product.category, id]);

 

  

  const handleFetchClick = (categoryId) => {
    if (selectedCategoryId === categoryId && showCategory) {
      setSelectedCategoryId(null);
      setShowCategory(false);
      setShowAllProducts(false);
      setSideHeader(false);
      setShowProduct(true);
     
    } else {
      setSelectedCategoryId(categoryId);
      setShowCategory(true);
      
      setShowAllProducts(false);
      setSideHeader(false);
      setShowProduct(false);
     
    }
  };

 

  const handleFetchAllProductClick = () => {
    setShowAllProducts(!showAllProducts);
    setShowCategory(false);
    setSideHeader(!sideHeader);
    setShowProduct(true);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
    setShowOrder(false);
    setShowProduct(false);
  };

  const handleOrderClick = () => {
    setShowOrder(!showOrder);
    setShowCart(false);
    setShowProduct(false);
  };

  const handleCartChange = (e) => {
    const selectedQuantity = parseInt(e.target.value, 10);
    const availableQuantity = parseInt(product.productQuantity, 10);
    console.log(selectedQuantity);
    console.log(availableQuantity);

    if (availableQuantity >= selectedQuantity) {
      setCart((prevCart) => ({ ...prevCart, productSelectedQuantity: e.target.value }));
    } else {
      alert("Stock unavailable");
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/customer/addCart`, cart);
      console.log(response.data);
      alert("Added to Cart Successfully");
      setQuantity("");
      const updateStock = await axios.put(`http://localhost:8080/customer/updateProduct/${product.id}`, { productQuantity: cart.productSelectedQuantity });
      console.log(updateStock.data);
      navigate(`/customerPage/${customerName}`);
      //window.location.reload();
    } catch (e) {
      console.log("Error", e);
    }
  };

  const fetchCategoryOfProduct = async(id) =>{
    try{
      const response = await axios.get(`http://localhost:8080/customer/fetchCategory/${id}`);
      console.log(response.data);
      return response.data.category;
      
    }
    catch(e){
      console.log("Error",e);
    }
  }
  const handleAddCartClick = async (id) => {
   
    const categoryId =  await fetchCategoryOfProduct(id);
    console.log(categoryId);
    <Cart id={id} categoyId={categoryId} name={customerName}/>
    navigate(`/customerPage/${customerName}/product/${id}/category/${categoryId}`);
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="image-Container">
          <img className="image" src="/image/1.jpg" width="50px" alt="Logo" />
        </div>
        <div className="navbar-1">
          <Link to={`/customerPage/${customerName}`}>OnlineShopping</Link>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
        </div>
        <div className="navbar-2 navbar-3">
          <Link to={`/customerPage/${customerName}/myCart`} onClick={() => { handleCartClick(); setShowProduct(false); setShowCart(true) }}>My Cart</Link>
          <Link to={`/customerPage/${customerName}/myOrder`} onClick={() => handleOrderClick()}>My Order</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>
      
       
          <div className="sideBarCart">
            <div className="sidebar" id="sidebar">
              <div className="sideHeadBorder">
                <button onClick={() => { toggleSidebar(); handleFetchAllProductClick(); }} className="sideHead">All Categories</button>
              </div>
              <div className={sidebarOpen ? "category-links active" : "category-links"}>
                {categories.map((category, index) => (
                  <li key={index}><Link to={`/product/${id}/category/${categoryId}`} className="sideLinks" onClick={(e) => { handleFetchClick(category.id); }}>{category.categoryTitle}</Link></li>
                ))}
              </div>
            </div>
          </div>
          {showProduct && (
             <div>
          <div className={`whole ${sideHeader ? "active" : ""}`}>
            <div className="productDetail">
              <div className="productImage">
                <img className="imageProduct" src={`data:image/jpeg;base64,${product.productImage}`} alt="product" />
              </div>
              <div className="details">
                <div className="title">
                  <h2 className="productTitle">{product.productTitle}</h2>
                </div>
                <div className="productDetails">
                  <h5>Description:<br />{product.productDescription}</h5>
                  <hr />
                  <h4 className="price">Price: &#8377;{product.productPrice}</h4>

                  <div className="productContainer">
                    <div className="productList">
                      <label htmlFor="quantity" className="label"></label>
                      <input type="number" id="quantity" name="quantity" placeholder="Enter Quantity..." value={cart.productSelectedQuantity} onChange={handleCartChange} />
                      <button className="button" onClick={handleAddToCart}>AddToCart</button>
                    </div>
                    <h4 className="stock">Stock: {product.productQuantity}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="relatedProducts">
              <h2 className="relatedHeader">Related Products:</h2>

              <div className="relatedDetails">
                <div className="productRelated">
                  {productCategories.map((relatedProduct) => (
                    <div className="cateogries" key={relatedProduct.id}>
                      <img className="relatedImageContainer" src={`data:image/jpeg;base64,${relatedProduct.productImage}`} alt="product" height="200px" />
                      <h4 className="relatedTitle">{relatedProduct.productTitle}</h4>
                      <h5 className="relatedDescription">{relatedProduct.productDescription}</h5>
                      <hr className="relatedLine" />
                      <h4 className="relatedPrice">Price: &#8377;{relatedProduct.productPrice}</h4>

                      <div className="col3">
                        <button className="relatedButton"  onClick={(e) =>handleAddCartClick(relatedProduct.id)}>AddToCart</button>
                        <h4 className="relatedStock">Stock: {relatedProduct.productQuantity}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
         <CartList customerName={customerName}/>
      )}

      {showOrder && (
        <div>
          <h2 className="cartHeading">My Order</h2>
          <table className="tableCart">
            <thead className="cartHeader">
              <tr>
                <th className="cartHeadings">Order Id</th>
                <th className="cartHeadings">Product</th>
                <th className="cartHeadings">Name</th>
                <th className="cartHeadings">Description</th>
                <th className="cartHeadings">Quantity</th>
                <th className="cartHeadings">Total Price</th>
                <th className="cartHeadings">Order Date</th>
                <th className="cartHeadings">Delivery Date</th>
                <th className="cartHeadings">Delivery Status</th>
                <th className="cartHeadings">Delivery Person</th>
                <th className="cartHeadings">Delivery Mobile No</th>
              </tr>
            </thead>
          </table>
        </div>
      )}
      
      
      {showCategory && selectedCategoryId &&(
        <DisplayProducts customerName={customerName} id={selectedCategoryId}></DisplayProducts>
      )}
    </React.Fragment>
  );
};

export default Cart;
