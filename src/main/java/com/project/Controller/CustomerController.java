package com.project.Controller;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.Entity.Cart;
import com.project.Entity.Customer;
import com.project.Entity.PaymentDetail;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Product;
import com.project.Exception.InsufficientStockException;
import com.project.Model.CustomerModel;
import com.project.Service.CustomerService;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Base64;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/customerRegister")
	public Customer registerCustomer(@RequestBody CustomerModel customerModel) {
		Customer customer = customerService.registerCustomer(customerModel);
		return customer;
		
	}
	
	@GetMapping("/getCustomer/{emailId}")
	public ResponseEntity<Customer> findCustomerByEmailId(@PathVariable String emailId){
		Optional<Customer> customer = customerService.findCustomerByEmailId(emailId);
		if(customer.isPresent()) {
			return ResponseEntity.ok(customer.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/fetchCategory/{id}")
	public ResponseEntity<Product> fetchCategory(@PathVariable Long id){
		Optional<Product> product = customerService.fetchProduct(id);
		if(product.isPresent()) {
			return ResponseEntity.ok(product.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/getCategory/{category}")
	public List<Product> getCategory(@PathVariable String category){
		List<Product> products = customerService.findProductByCategory(category);
		return products;
	}
	
	@PostMapping("/addCart")
	public Cart addCart(@RequestBody Cart cart) {
		Cart addedCart = customerService.addCart(cart);
		System.out.println(addedCart);
		return addedCart;
	}
	
	@PutMapping("/updateProduct/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
		int decrement = request.get("productQuantity");
		Optional<Product> product = customerService.updateProduct(id, decrement);
		try {
			if(product.isPresent()) {
				return ResponseEntity.ok(product.get());
			}
			else {
				return ResponseEntity.notFound().build();
			}
			
		}
		catch(InsufficientStockException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	@GetMapping("/fetchCart/{customerName}")
	public List<Cart> fetchCart(@PathVariable String customerName){
		List<Cart> cart = customerService.fetchCart(customerName);
		return cart;
	}
	
	@DeleteMapping("/removeProduct/{id}")
	public void removeProduct(@PathVariable Long id) {
		customerService.removeProduct(id);
	}
	
	@PostMapping("/paymentDetail")
	public PaymentDetail payment(@RequestBody PaymentDetail paymentDetail) {
		PaymentDetail customerPayment = customerService.payment(paymentDetail);
		return customerPayment;
	}
	/*
	 @PostMapping("/cartItems")
	    public void cartItems(@RequestBody List<CartItem> cartItemRequests) throws IOException {
	        List<CartItem> cartItems = cartItemRequests.stream().map(request -> {
	            CartItem cartItem = new CartItem();
	            cartItem.setOrderId(request.getOrderId());
	            cartItem.setProductId(request.getProductId());
	            cartItem.setProductTitle(request.getProductTitle());
	            cartItem.setProductDescription(request.getProductDescription());
	            cartItem.setProductSelectedQuantity(request.getProductSelectedQuantity());
	            cartItem.setProductPrice(request.getProductPrice());
	            cartItem.setOrderDate(request.getOrderDate());
	            cartItem.setDeliveryDate(request.getDeliveryDate());
	            cartItem.setDeliveryPerson(request.getDeliveryPerson());
	            cartItem.setDeliveryStatus(request.getDeliveryStatus());
	            cartItem.setDeliveryMobileNo(request.getDeliveryMobileNo());
	            cartItem.setCustomerName(request.getCustomerName());
	           
	            
	            
	            try {
	            	byte bytes[] = request.getProductImage().getBytes();
	        		String encodedImage = Base64.getEncoder().encodeToString(bytes);
	                System.out.println(encodedImage);
	                cartItem.setProductImage(encodedImage);
	            } catch (Error e) {
	                e.printStackTrace();
	            }
	            return cartItem;
	        }).collect(Collectors.toList());

	        // Process each cart item
	        cartItems.forEach(customerService::makeOrder);
	    }
	 */
	 @Transactional
	 @DeleteMapping("/clearCart/{customerName}")
	 public void clearCart(@PathVariable String customerName) {
		 customerService.clearCart(customerName);
	 }
	 
	 @GetMapping("/getPayment/{customerName}")
	 public ResponseEntity<PaymentDetail> getPayment(@PathVariable String customerName){
		 Optional<PaymentDetail> payment = customerService.getPayment(customerName);
		 if(payment.isPresent()) {
			 return ResponseEntity.ok(payment.get());
		 }
		 else {
			 return ResponseEntity.notFound().build();
		 }
	 }
	 
	 @GetMapping("/getOrders/{orderId}")
	 public List<CartItem> getOrders(@PathVariable String orderId){
		 List<CartItem> orders = customerService.getOrders(orderId);
		 return orders;
	 }
	 
	 /*
	
	@PostMapping("/cartItems")
	public void cartItems(@RequestParam("orderId") String orderId,
						  @RequestParam("productId") Long productId,
						  @RequestParam("prdouctImage")MultipartFile productImage,
						  @RequestParam("productTitle")String productTitle,
						  @RequestParam("productDescription")String productDescription,
						  @RequestParam("productSelectedQuantity")int productSelectedQuantity,
						  @RequestParam("productPrice")int productPrice,
						  @RequestParam("customerName")String customerName,
						  @RequestParam("orderDate")Date orderDate,
						  @RequestParam("deliveryStatus")String deliveryStatus,
						  @RequestParam("deliveryPerson")String deliveryPerson,
						  @RequestParam("deliveryDate")Date deliveryDate,
						  @RequestParam("deliveryMobileNo")int deliveryMobileNo) throws IOException{
		  CartItem cartItem = new CartItem();
		  byte bytes[] = productImage.getBytes();
		  String encodedImage = Base64.getEncoder().encodeToString(bytes);
			
          cartItem.setOrderId(orderId);
          cartItem.setProductId(productId);
          cartItem.setProductTitle(productTitle);
          cartItem.setProductDescription(productDescription);
          cartItem.setProductSelectedQuantity(productSelectedQuantity);
          cartItem.setProductPrice(productPrice);
          cartItem.setOrderDate(orderDate);
          cartItem.setDeliveryDate(deliveryDate);
          cartItem.setDeliveryPerson(deliveryPerson);
          cartItem.setDeliveryStatus(deliveryStatus);
          cartItem.setDeliveryMobileNo(deliveryMobileNo);
          cartItem.setCustomerName(customerName);
          cartItem.setProductImage(encodedImage);
          
          customerService.makeOrder(cartItem);
         
          
	}*/
	@PostMapping("/cartItems")
	public void cartItems(@RequestBody List<CartItem> cartItems) {
		customerService.makeOrder(cartItems);
	}
	
	@GetMapping("/getCategories")
	public List<Categories> getCategories(){
		return customerService.getCategories();
	}
	
	
	
}
	



