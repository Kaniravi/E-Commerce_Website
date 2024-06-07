import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MyOrders = () =>{
  const{navigate} = useNavigate();
  const {deliveryPersonName} = useParams();
  const [myDeliveries, setMyDeliveries] = useState([]);
  const[showDelivery,setShowDelivery] = useState(true);
  const[updateDelivery,setShowUpdateDelivery] = useState(false);
  const[orderId, setOrderId] = useState("");
  const[orders,setOrders] = useState([]);
  const[showOrder,setShowOrder] = useState(false);
  const[updateDeliveryStatus, setUpdateDeliveryStatus] = useState([]);

  const handleDelivery = () =>{
    setShowDelivery(true);
    setShowUpdateDelivery(false);
  }
  const handleDeliveryUpdate = () =>{
    setShowDelivery(false);
    setShowUpdateDelivery(true);
  }
  const handleSearchChange = (e) =>{
    setOrderId(e.target.value);
  }
  useEffect(()=>{
    const fetchDeliveries = async() =>{
      try{
        const response = await axios.get(`http://localhost:8080/deliveryPerson/fetchDeliveries/${deliveryPersonName}`);
        console.log(response.data);
        setMyDeliveries(response.data);
      }
      catch(e){
        console.log("Error",e);
      }
    }
    fetchDeliveries();

  },[deliveryPersonName]);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.get(`http://localhost:8080/deliveryPerson/getDelivery/${orderId}`);
      console.log(response.data);
      setOrders(response.data);
      setShowOrder(true);
      
      
    }
    catch(e){
      console.log("Error",e);
    }
  }
  const handleUpdateSubmit = async(e) =>{
    e.preventDefault();
    try{
      await axios.put(`http://localhost:8080/deliveryPerson/updateCart/${orderId}`,{
        deliveryDate: updateDeliveryStatus.deliveryDate,
        deliveryStatus: updateDeliveryStatus.deliveryStatus,
        deliveryTime: updateDeliveryStatus.deliveryTime,
        deliveryMobileNo: updateDeliveryStatus.deliveryMobileNo
        
      });
      navigate(`/deliveryPersonPage`);
    }
    catch(e){
      console.log("Error",e);
    }
  }

  const handleDeliveryStatus = (e) =>{
    const{name,value} = e.target;
    setUpdateDeliveryStatus({...updateDeliveryStatus,[name]:value});
  }
  return(
   
       <React.Fragment>
          <div className="navbar">
            <div className="image-Container">
              <img className="image" src="/image/1.jpg" width="50px" alt="Logo" />
            </div>
            <div className="navbar-1">
              <a href="#">Online Shopping</a>
              <a href="#">Contact Us</a>
              <a href="#">About Us</a>
            </div>
            <div className="navbar-2 delivery">
              <Link to={`/deliveryPersonPage/${deliveryPersonName}/myOrders`} onClick={handleDelivery}>My Deliveries</Link>
              <Link to={`/deliveryPersonPage/${deliveryPersonName}/updateOrders`} onClick={handleDeliveryUpdate}>Update Order Delivery</Link>    
              <Link to={`/`}>Logout</Link>       
               </div>
          </div>

          {showDelivery &&(
            <div>
              <h2 className="searchHeader">My Deliveries</h2>
              <table className="tableCart">
           <thead className="cartHeader">
             <tr>
               <th className="cartHeadings">Order Id</th>
               <th className="cartHeadings">Product</th>
               <th className="cartHeadings">Name</th>
               <th className="cartHeadings">Quantity</th>
               <th className="cartHeadings">Total Price</th>
               <th className="cartHeadings">CustomerName</th>
               <th className="cartHeadings">Street</th>
               <th className="cartHeadings">City</th>
               <th className="cartHeadings">Pincode</th>
               <th className="cartHeadings">Mobile No</th>
               <th className="cartHeadings">Order Date</th>
               <th className="cartHeadings">Delivery Date</th>
               <th className="cartHeadings">Delivery Status</th>
               <th className="cartHeadings">Delivery Person</th>
               <th className="cartHeadings">Delivery Mobile No</th>
             </tr>
           </thead>
           <tbody className="cartTableBody">
            {myDeliveries.map((delivery)=>(
              <tr key={delivery.id}>
                  <td className="tableData">{delivery.orderId}</td>
                  <td className="tableData order"><img src={`data:image/jpeg;base64,${delivery.productImage}`} className="imageContainer"></img></td>
                  <td className="tableData">{delivery.productTitle}</td>
                  <td className="tableData">{delivery.productSelectedQuantity}</td>
                  <td className="tableData">{delivery.productPrice}</td>
                  <td className="tableData">{delivery.customerName}</td>
                  <td className="tableData">{delivery.street}</td>
                  <td className="tableData">{delivery.city}</td>
                  <td className="tableData">{delivery.pincode}</td>
                  <td className="tableData">{delivery.mobileNo}</td>
                  <td className="tableData">{delivery.orderDate}</td>
                  <td className="tableData">{delivery.deliveryDate}</td>
                  <td className="tableData">{delivery.deliveryStatus}</td>
                  <td className="tableData">{delivery.deliveryPerson}</td>
                  <td className="tableData">{delivery.deliveryMobileNo}</td>
              </tr> 
            ))}
           </tbody>
         </table>
            </div>
          )}

         
          {updateDelivery &&(
            <div>
            <div className="searchForm">
              <h2 className="searchHeader">Search Customer Orders</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="orderId"></label>
                <input
                type="text"
                id="orderId"
                name="orderId"
                value={orderId}
                onChange={handleSearchChange}
                className="searchInput"
                placeholder="Enter Order Id"
                >
                </input>

                <button type="submit" className="searchButton">Search</button>
              </form>

              {
                        <div className="searchTable">
      
                        <table className="tableCart tableSearch">
                          <thead className="cartHeader">
                            
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
                            
                          </thead>
                          {showOrder&&(
                            <tbody className="cartTableBody">
                            {orders.map((items)=>(
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
            <div>
            <h4 className="searchHeader">Update Delivery Status</h4>
            <form className="assignForm" onSubmit={handleUpdateSubmit}>
              <div className="column-container">
              <div className="col1">
              <label htmlFor="orderId" className="updateLabel">Order Id</label>
              <input
              type="text"
              id="orderId"
              name="orderId"
              value={updateDeliveryStatus.orderId}
              onChange={handleDeliveryStatus}
              className="assignLabel"
              >
              </input>

              <label htmlFor="deliveryDate"className="updateLabel">Select Delivery Date</label>
              <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={updateDeliveryStatus.deliveryDate}
              onChange={handleDeliveryStatus}
              className="assignLabel"
              >
              </input>
              
              </div>
              
            <div className="col2">
            <label htmlFor="deliveryMobileNo" className="updateLabel">Delivery Mobile No</label>
              <input
              type="text"
              id="deliveryMobileNo"
              name="deliveryMobileNo"
              value={updateDeliveryStatus.deliveryMobileNo}
              onChange={handleDeliveryStatus}
              className="assignLabel"
              >
              </input>
            <label htmlFor="deliveryTime" className="updateLabel">Delivery Time</label>
              <select id="deliveryTime" name="deliveryTime" value={updateDeliveryStatus.deliveryTime} onChange={handleDeliveryStatus} className="assignLabel">
                <option value="">Select Delivery Time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>

              <label htmlFor="deliveryStatus" className="updateLabel">Delivery Status</label>
              <select id="deliveryStatus" name="deliveryStatus" value={updateDeliveryStatus.deliveryStatus} onChange={handleDeliveryStatus} className="assignLabel">
                <option value="">Select Delivery Status</option>
                <option value="Delivered">Delivered</option>
                <option value="On the Way">On the Way</option>
                <option value="Processing">Processing</option>
              </select>

             
            </div>
           
              </div>
              
             

              <button type="submit" className="assignButton">Update Delivery Status</button>
            
            </form>
          </div>
          </div>
            
          )}
    </React.Fragment>
   
  )
  }
   
export default MyOrders;