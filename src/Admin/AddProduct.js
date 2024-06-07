import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const initialState ={
  productTitle:"",
  productDescription:"",
  category:"",
  productQuantity:"",
  productPrice:"",
  productImage:null
}
const AddProduct = () =>{
  const[categories,setCategories] = useState([]);
  const[product,setProduct] = useState(initialState);
  useEffect(()=>{
    const fetchCategories = async() =>{
      try{
        const response = await axios.get(`http://localhost:8080/admin/getCategory`);
        console.log(response.data);
        setCategories(response.data);

      }
      catch(e){
        console.log("Error",e);
      }
    }
    fetchCategories();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === 'category' ? Number(value) : value });
  }
  
  const handleImageChange = (e) =>{
    const files = e.target.files[0];
    setProduct({...product,productImage:files});
  }

  const handleProductSubmit = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("productTitle",product.productTitle);
    formData.append("productDescription",product.productDescription);
    formData.append("category",product.category);
    formData.append("productQuantity",product.productQuantity);
    formData.append("productPrice",product.productPrice);
    formData.append("productImage",product.productImage);

    try{
      const response = await axios.post(`http://localhost:8080/admin/addProduct`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log(response.data);
      alert("Product Added Successfully");
      setProduct(initialState);
      window.location.reload();
    }
    catch(e){
      console.log("Error",e);
    }
    
  }
  return(
    <React.Fragment>
        <div className="registerForm">
          <h2 className="registerHeader">Add Product</h2>
          <form className="form" onSubmit={handleProductSubmit}>
            <label htmlFor="productTitle" className="registerLabel">Product Title</label>
            <input
            type="text"
            id="productTitle"
            name="productTitle"
            className="registerInput"
            value={product.productTitle}
            onChange={handleChange}
            >
            </input>

            <label htmlFor="productDescription" className="registerLabel">Product Description</label>
            <textarea
            type="text"
            id="productDescription"
            name="productDescription"
            className="registerInput"
            value={product.productDescription}
            onChange={handleChange}
            >
            </textarea>

            <label htmlFor="category" className="registerLabel">Category</label>
            <select id="category" name="category" className="registerInput"  value={product.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((category)=>(
               <option key={category.id} value={category.id}>{category.categoryTitle}</option>

              ))}
            </select>

            <label htmlFor="productQuantity" className="registerLabel">Product Quantity</label>
            <input
            type="text"
            id="productQuantity"
            name="productQuantity"
            className="registerInput"
            value={product.productQuantity}
            onChange={handleChange}
            >
            </input>

            <label htmlFor="productPrice" className="registerLabel">Product Price</label>
            <input
            type="text"
            id="productPrice"
            name="productPrice"
            className="registerInput"
            value={product.productPrice}
            onChange={handleChange}
            >
            </input>

            <label htmlFor="productImage" className="registerLabel">Select Product Image</label>
            <input
            type="file"
            id="productImage"
            name="productImage"
            className="registerInput"
            onChange={handleImageChange}
            >
            </input>

            <button className="buttonRegister" type="submit">Add Product</button>
          </form>
        </div>
    </React.Fragment>
  )
}
export default AddProduct;