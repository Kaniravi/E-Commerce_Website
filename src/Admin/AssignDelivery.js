import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const AssignDelivery = () =>{
  const[orderId, setOrderId] = useState("");
  const[order,setOrder] = useState([]);
  const[showOrder,setShowOrder] = useState(false);
  const[assignOrder, setAssignOrder] = useState([]);
  const[deliveryPerson,setDeliveryPerson] = useState([]);
  const handleSearchChange = (e) =>{
    setOrderId(e.target.value);
    setShowOrder(true);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.get(`http://localhost:8080/admin/getAllOrders/${orderId}`);
      console.log(response.data);
      setOrder(response.data);
      setOrderId("");
    }
    catch(e){
      console.log("Error",e);
    }
  }

  const handleAssignSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`http://localhost:8080/admin/assignDeliveryPerson`,{
          orderId: assignOrder.orderId,
          deliveryPerson: assignOrder.deliveryPerson
        });
        console.log(response.data);

    }
    catch(e){
      console.log("Error",e);
    }
  }
 useEffect(()=>{
  const fetchDeliveryPerson = async() =>{
    try{
      const response = await axios.get(`http://localhost:8080/deliveryPerson/getAllDeliveryPerson`);
      console.log(response.data);
      setDeliveryPerson(response.data);
    }
    catch(e){
      console.log("Error",e);
    }
  }
  fetchDeliveryPerson();
 },[]);

  const handleAssignChange = (e) =>{
    const{name,value} = e.target;
    setAssignOrder({...assignOrder,[name]:value});
  }
  return(
    <React.Fragment>
      <div className="searchForm">
      <div className="customerOrders">
        <h4 className="searchHeader">Search Customer Orders</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchOrder" className="searchLabel"></label>
          <input 
          type="text" 
          placeholder="Enter Order Id" 
          id="searchOrder" 
          name="searchOrder"
          value={orderId}
          onChange={handleSearchChange} 
          className="searchInput"
          ></input>
          <button type="submit" className="searchButton">Search</button>
        </form>
      </div>

      {
        <div className="searchTable">
      
        <table className="tableCart tableSearch">
          <thead className="cartHeader">
            <tr>
              <th className="cartHeadings">Order Id</th>
              <th className="cartHeadings">Product</th>
              <th className="cartHeadings">Name</th>
              <th className="cartHeadings">Quantity</th>
              <th className="cartHeadings">Total Price</th>
              <th className="cartHeadings">Mobile No</th>
              <th className="cartHeadings">Street</th>
              <th className="cartHeadings">City</th>
              <th className="cartHeadings">PinCode</th>
              <th className="cartHeadings">Order Date</th>
              <th className="cartHeadings">Delivery Date</th>
              <th className="cartHeadings">Delivery Status</th>
              <th className="cartHeadings">Delivery Person</th>
              <th className="cartHeadings">Delivery Mobile No</th>
            </tr>
          </thead>
          {showOrder&&(
            <tbody className="cartTableBody">
            {order.map((items)=>(
             <tr key={items.id} className="tableRow">
                 <td className="tableData">{items.orderId}</td>
                 <td className="tableData"><img src={`data:image/jpeg;base64,${items.productImage}`} className="imageContainer imageCartContainer" alt={items.productTitle} /></td>
                 <td className="cartTitle tableData">{items.productTitle}</td>
                 <td className="cartQuantity tableData order">{items.productSelectedQuantity}</td>
                 <td className="cartPrice tableData order">{items.productPrice}</td>
                 <td className="tableData order">{items.mobileNo}</td>
                 <td className="tableData order">{items.street}</td>
                 <td className="tableData order">{items.city}</td>
                 <td className="tableData order">{items.pincode}</td>
                 <td className="tableData order">{items.orderDate}</td>
                 <td className="tableData order">{items.deliveryDate} {items.deliveryTime}</td>
                 <td className="tableData order">{items.deliveryStatus}</td>
                 <td className="tableData order">{items.deliveryPerson}</td>
                 <td className="tableData order">{items.deliveryMobileNo}</td>
             </tr>
            ))}
          </tbody>
          )}
        </table>
      </div>
      }
      </div>

      <div className="assignOrder">
        <h4 className="searchHeader">Assign Delivery To Orders</h4>
        <form onSubmit={handleAssignSubmit}>
          <div className="inputForm">
          <label htmlFor="orderId" className="searchLabel">Enter OrderId:</label>
          <input
          className="searchInput"
          type="text"
          name="orderId"
          id="orderId"
          value={assignOrder.orderId}
          onChange={handleAssignChange}
          >
          </input>
          </div>
          
          <div className="inputForm">
          <label htmlFor="deliveryPerson" className="searchLabel">Delivery Person</label>
          <select id="deliveryPerson" name="deliveryPerson" value={assignOrder.deliveryPerson} onChange={handleAssignChange} className="searchInput">
            <option value="">Select Delivery Person</option>
             {deliveryPerson.map((person)=>(
              
              <option value={person.firstName}>{person.firstName}</option>
             ))}
          </select>

          </div>

         
          <button className="assignButton" type="submit">Assign Delivery Person</button>
        </form>
      </div>
      
    </React.Fragment>
  )
}

export default AssignDelivery;