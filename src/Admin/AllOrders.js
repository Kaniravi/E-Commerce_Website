import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const AllOrders = () =>{
  const [order,setOrder] = useState([]);
  useEffect(()=>{
    const fetchAllOrders = async() =>{
      const response = await axios.get(`http://localhost:8080/admin/getAllOrders`);
      console.log(response.data);
      setOrder(response.data);
    }
    fetchAllOrders();
  },[])
  return(
    <React.Fragment>
      <div>
      <div>
         <h2 className="cartHeading">My Order</h2>
         <table className="tableCart">
           <thead className="cartHeader">
             
               <th className="cartHeadings">Order Id</th>
               <th className="cartHeadings">Product</th>
               <th className="cartHeadings">Name</th>
               <th className="cartHeadings">Quantity</th>
               <th className="cartHeadings">Total Price</th>
               <th className="cartHeadings">CustomerName</th>
               <th className="cartHeadings">Street</th>
               <th className="cartHeadings">City</th>
               <th className="cartHeadings">Pincode</th>
               <th className="cartHeadings">Order Date</th>
               <th className="cartHeadings">Delivery Date</th>
               <th className="cartHeadings">Delivery Status</th>
               <th className="cartHeadings">Delivery Person</th>
               <th className="cartHeadings">Delivery Mobile No</th>
             
           </thead>
           <tbody className="cartTableBody">
             {order.map((items)=>(
              <tr key={items.id} className="tableRow">
                  <td className="tableData">{items.orderId}</td>
                  <td className="tableData"><img src={`data:image/jpeg;base64,${items.productImage}`} className="imageContainer imageCartContainer" alt={items.productTitle} /></td>
                  <td className="cartTitle tableData">{items.productTitle}</td>
                  <td className="cartQuantity tableData order">{items.productSelectedQuantity}</td>
                  <td className="cartPrice tableData order">{items.productPrice}</td>
                  <td className="tableData order">{items.customerName}</td>
                  <td className="tableData order">{items.street}</td>
                  <td className="tableData order">{items.city}</td>
                  <td className="tableData order">{items.pincode}</td>
                  <td className="tableData order">{items.orderDate}</td>
                  <td className="tableData order">{items.deliveryDate} {items.deliveryTime}</td>
                  <td className="tableData order">{items.deliveryStatus}</td>
                  <td className="tableData order">{items.deliveryPerson}</td>
                  <td className="tableData order">{items.mobileNo}</td>
              </tr>
             ))}
           </tbody>
         </table>
       </div>
      </div>
    </React.Fragment>
  )
}

export default AllOrders;