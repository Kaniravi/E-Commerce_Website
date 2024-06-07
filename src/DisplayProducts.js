import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cart from "./Customer/Cart";

const DisplayProducts = ({id, customerName}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 
  console.log(id);
 console.log(customerName);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getProduct/${id}`);
        console.log(response.data);
        setProducts(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchProducts();
  }, [id]);

  const fetchCategoryOfProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/fetchCategory/${productId}`);
      console.log(response.data);
      return response.data.category;
    } catch (e) {
      console.log("Error", e);
    }
  };

  const handleAddCartClick = async (productId) => {
    const categoryId = await fetchCategoryOfProduct(productId);
    console.log(categoryId);
    <Cart  customerName={customerName}  id={productId} categoryId={categoryId}/>
    navigate(`/customerPage/${customerName}/product/${productId}/category/${categoryId}`);
  };
  return(
    <React.Fragment>
      
      
      <div className="span1 span2">
        {products.map((product)=>(
          <div className="singleProductContainer">
          <div className="container">
            <img className="imageContainer" src={`data:image/jpeg;base64,${product.productImage}`} alt="doctor" />
            <p className="paraContainer">{product.productTitle}</p>
            <h4 className="headerContainer">{product.productDescription}</h4>
            <hr></hr>
            <h5 className="priceContainer">Price: &#8377; 
            {product.productPrice}</h5>
            <div className="sameLine">
            <button className="buttonProduct" onClick={(e) =>handleAddCartClick(product.id)}>Add To Cart</button>
            <h5 className="stockContainer">Stock: {product.productQuantity}</h5>
            </div>
          </div>
          </div>
          
        ))}
        </div>

        
       
    </React.Fragment>
  )
}
export default DisplayProducts;