import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "./Customer/Cart";

const DisplayAllProducts = ({ customerName }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getAllProducts`);
        console.log(response.data);
        setProducts(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    };
    fetchAllProducts();
  }, []);

 
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
      <div className="span">
        {products.map((product) => (
          <div className="container" key={product.id}>
            <img className="imageContainer" src={`data:image/jpeg;base64,${product.productImage}`} alt="product" />
            <p className="paraContainer">{product.productTitle}</p>
            <h4 className="headerContainer">{product.productDescription}</h4>
            <hr></hr>
            <h5 className="priceContainer">Price: &#8377;{product.productPrice}</h5>
            <div className="sameLine">
              <button className="buttonProduct" onClick={() => handleAddCartClick(product.id)}>Add To Cart</button>
              <h5 className="stockContainer">Stock: {product.productQuantity}</h5>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default DisplayAllProducts;
