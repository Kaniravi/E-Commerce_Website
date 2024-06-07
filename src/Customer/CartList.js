import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const paymentInitialState ={
  nameOnCard:"",
  cardNumber:0,
  validThrough:"",
  cvv:0,
  

}
const generateRandomId = (length) =>{
      const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result="";
      const charactersLength = characters.length;

      for(let i=0;i<length;i++){
        result += characters.charAt(Math.floor(Math.random()* charactersLength));
      }
      return result;
}


const CartList = () =>{
  const navigate = useNavigate();
 
  const { customerName, id, categoryId } = useParams();



  const [customerCart, setCustomerCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const[order,setOrder] = useState([]);
  const [showProduct, setShowProduct] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const[showCheckOut, setShowCheckOut] = useState(false);
  const[payment,setPayment] = useState(paymentInitialState);
  const[donePayment,setDonePayment] = useState(false);
  const[address,setAddress] = useState([]);

  
  const handleCartClick = () => {
    setShowCart(true);
    setShowOrder(false);
    setShowProduct(false);
    setShowCheckOut(false);
   
  };

  const handleOrderClick = () => {
    setShowOrder(true);
    setShowCart(false);
    setShowProduct(false);
    setShowCheckOut(false);

  };
  useEffect(() => {
  
    
        const fetchPayment = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/customer/getPayment/${customerName}`);
            console.log(response.data);
            const orderId = response.data.orderId;
      
            const orderResponse = await axios.get(`http://localhost:8080/customer/getOrders/${orderId}`);
            console.log(orderResponse.data);
            setOrder(orderResponse.data);
          } catch (error) {
            console.log("Error fetching payment:", error);
          }
        };
        fetchPayment();
      
      
  }, [donePayment, customerName]);
  

  const handleRemoveCartProduct =async(id) =>{
    try{
        await axios.delete(`http://localhost:8080/customer/removeProduct/${id}`);
        window.location.reload();
    }
    catch(e){
      console.log("Error",e);
    }
  }
  const handlePaymentChange = (e) =>{
    const{name,value}= e.target;
    setPayment({...payment,[name]:value});
  }


  const handlePlaceChange = (e) =>{
    const{name,value} = e.target;
    setAddress({...address,[name]:value});
  }

 
  const handlePayment = async (e) => {
    e.preventDefault();
    const orderId = generateRandomId(8);
    const orderDate = new Date().toISOString().split('T')[0];
   
    const paymentDetails = {
      ...payment,
      orderId,
      orderDate,
      customerName,
    };
     
    const cartItems = customerCart.map((item) => ({
      orderId: orderId,
      productId: item.id,
      productImage: item.productImage,
      productTitle: item.productTitle,
      productDescription: item.productDescription,
      productSelectedQuantity: item.productSelectedQuantity,
      productPrice: parseInt(item.productPrice, 10),
      customerName:customerName,
      orderDate: orderDate,
      deliveryStatus: "pending",
      deliveryPerson:"pending",
      deliveryDate:"pending",
      deliveryTime:"",
      deliveryMobileNo:"pending",
      ...address


    }));
    
   console.log(cartItems.productPrice);
    console.log(orderId);
    console.log(cartItems);
  
    try {
      await axios.post(`http://localhost:8080/customer/paymentDetail`, paymentDetails);
      await axios.post(`http://localhost:8080/customer/cartItems`, cartItems, {
        headers: {
          'Content-Type': "application/json",
        },
      });
      setDonePayment(true);
      
      await axios.delete(`http://localhost:8080/customer/clearCart/${customerName}`);
      setPayment(paymentInitialState);
      setCustomerCart();
      setTotalPrice(0);
      navigate(`/customerPage/${customerName}`);
      
      
    } catch (e) {
      console.log("Error", e);
    }
  };
  
  

  
  const handleCheckOut = async() =>{
        
       
        setShowCart(false);
        setShowOrder(false);
        setShowCheckOut(true);
        setShowProduct(false);
        
  }
  useEffect(() => {
    const fetchCustomerCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/customer/fetchCart/${customerName}`);
        console.log(response.data);
        setCustomerCart(response.data);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchCustomerCart();
  }, [customerName]);
  useEffect(() => {
    let totalPrice = 0;
    customerCart.forEach((item) => {
      const quantityProduct = parseInt(item.productSelectedQuantity, 10);
      console.log("Price");
      const priceOfProduct = parseFloat(item.productPrice);
      totalPrice += quantityProduct * priceOfProduct;
      console.log(totalPrice)
    });
    setTotalPrice(totalPrice);
  }, [customerCart]);
    return(
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
         
          <Link to={`/customerPage/${customerName}/myCart`} onClick={ handleCartClick}>My Cart</Link>
          <Link to={`/customerPage/${customerName}/myOrder`} onClick={handleOrderClick }>My Order</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>
        {showCart &&(
            <div>
            <h2 className="cartHeading">My Cart</h2>
            <table className="tableCart">
              <thead className="cartHeader">
                <tr>
                  <th className="cartHeadings">Product</th>
                  <th className="cartHeadings">Name</th>
                  <th className="cartHeadings">Description</th>
                  <th className="cartHeadings">Quantity</th>
                  <th className="cartHeadings">Action</th>
                </tr>
              </thead>
              <tbody className="cartTableBody">
                {customerCart.map((item, index) => (
                  <tr key={index}>
                    <td className="tableData"><img src={`data:image/jpeg;base64,${item.productImage}`} className="imageContainer imageCartContainer" alt={item.productTitle}></img></td>
                    <td className="cartTitle tableData" >{item.productTitle}</td>
                    <td className="cartDescription tableData">{item.productDescription}</td>
                    <td className="tableData">{item.productSelectedQuantity}</td>
                    <td className="tableData"><button className="removeCartButton" onClick={()=>handleRemoveCartProduct(item.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="footCart foot">
                  <td colSpan="3" ></td>
                  <td className="col5">Total:</td>
                  <td colSpan="2" className="col5">&#8377;{totalPrice}</td>
                </tr>
                <tr><button className="checkoutButton" onClick={() =>{handleCheckOut()}}>CheckOut</button></tr>
              </tfoot>
            </table>
          </div>
        )}

        {showCheckOut &&(
          <div>
            <form className="formCheckout">
              <h2 className="checkoutHeader">Payment Details</h2>
              <label htmlFor="nameOnCard" className="checkoutLabel">Name On Card</label>
              <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              className="checkoutInput"
              value={payment.nameOnCard}
              onChange={handlePaymentChange}
              >
              </input>

              <label htmlFor="cardNumber" className="checkoutLabel">Card Number</label>
              <input
              type="number"
              id="cardNumber"
              name="cardNumber"
              className="checkoutInput"
              value={payment.cardNumber}
              onChange={handlePaymentChange}
              >
              </input>

              <label htmlFor="validThrough" className="checkoutLabel">Valid Through</label>
              <input
              type="date"
              id="validThrough"
              name="validThrough"
              className="checkoutInput"
              value={payment.validThrough}
              onChange={handlePaymentChange}
              >
              </input>

              <label htmlFor="cvv" className="checkoutLabel">cvv</label>
              <input
              type="password"
              id="cvv"
              name="cvv"
              className="checkoutInput"
              value={payment.cvv}
              onChange={handlePaymentChange}
              >
              </input>

              <label htmlFor="street" className="checkoutLabel">Street</label>
              <textarea
               type="text"
               id="street"
               name="street"
               className="checkoutInput"
               value={customerCart.street}
               onChange={handlePlaceChange}

              >
              </textarea>

              <label htmlFor="city" className="checkoutLabel">City</label>
              <input
              type="text"
              id="city"
              name="city"
              className="checkoutInput"
              value={customerCart.city}
              onChange={handlePlaceChange}
              >
              </input>
              <label htmlFor="pincode" className="checkoutLabel">PinCode</label>
              <input
              type="text"
              id="pincode"
              name="pincode"
              className="checkoutInput"
              value={customerCart.pincode}
              onChange={handlePlaceChange}
              >
              </input>
              <label htmlFor="mobileNo" className="checkoutLabel">MobileNo</label>
                <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                className="checkoutInput"
                value={customerCart.mobileNo}
                onChange={handlePlaceChange}
                >
                </input>
              <button className="checkOutButton"onClick={handlePayment}>Pay Rs.{totalPrice}</button>
            </form>
          </div>
        )}

        {showOrder &&(
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
           <tbody className="cartTableBody">
             {order.map((items)=>(
              <tr key={items.id} className="tableRow">
                  <td className="tableData">{items.orderId}</td>
                  <td className="tableData"><img src={`data:image/jpeg;base64,${items.productImage}`} className="imageContainer imageCartContainer" alt={items.productTitle} /></td>
                  <td className="cartTitle tableData">{items.productTitle}</td>
                  <td className="cartDescription tableData ">{items.productDescription}</td>
                  <td className="cartQuantity tableData order">{items.productSelectedQuantity}</td>
                  <td className="cartPrice tableData order">{items.productPrice}</td>
                  <td className="tableData order">{items.orderDate}</td>
                  <td className="tableData order">{items.deliveryDate}</td>
                  <td className="tableData order">{items.deliveryStatus} {items.deliveryTime}</td>
                  <td className="tableData order">{items.deliveryPerson}</td>
                  <td className="tableData order">{items.deliveryMobileNo}</td>
              </tr>
             ))}
           </tbody>
         </table>
       </div>
        )}

        
      </React.Fragment>
    )
  
}
export default CartList;