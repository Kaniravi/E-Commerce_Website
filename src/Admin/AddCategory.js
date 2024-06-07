import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const initialState = {
  categoryTitle: "",
  categoryDescription: ""
};

const AddCategory = () => {
  const {adminName} = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleAddClick = async(e)=>{
     e.preventDefault();
     try{
        const response = await axios.post(`http://localhost:8080/admin/addCategory`,category);
        console.log(response.data);
        alert("Added Successfully");
        setCategory(initialState);
        navigate(`/adminPage/${adminName}`);
        window.location.reload();
     }
     catch(e){
      console.log("Error",e);
     }
  }

 

  return (
    <div className="registerForm">
      <form className="form">
        <h2 className="registerHeader">Add Category</h2>
        <label htmlFor="categoryTitle" className="registerLabel">Category Title</label>
        <input
          type="text"
          id="categoryTitle"
          name="categoryTitle"
          className="registerInput"
          value={category.categoryTitle}
          onChange={handleChange}
        />

        <label htmlFor="categoryDescription" className="registerLabel">Category Description</label>
        <textarea
          id="categoryDescription"
          name="categoryDescription"
          type="text"
          className="registerInput"
          value={category.categoryDescription}
          onChange={handleChange}
        />
        <button className="buttonRegister" onClick={handleAddClick}>Add Category</button>
      </form>
      
    </div>
  );
};

export default AddCategory;
