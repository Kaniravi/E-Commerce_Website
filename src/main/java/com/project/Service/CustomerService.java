package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Entity.Cart;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Customer;
import com.project.Entity.PaymentDetail;
import com.project.Entity.Product;
import com.project.Model.CustomerModel;

import jakarta.transaction.Transactional;

@Service
public interface CustomerService {

	Customer registerCustomer(CustomerModel customerModel);

	Optional<Customer> findCustomerByEmailId(String emailId);

	Optional<Product> fetchProduct(Long id);

	List<Product> findProductByCategory(String category);

	Cart addCart(Cart cart);

	Optional<Product> findProductById(Long id);

	Optional<Product> updateProduct(Long id, int decrement);

	List<Cart> fetchCart(String customerName);

	void removeProduct(Long id);

	PaymentDetail payment(PaymentDetail paymentDetail);

	void makeOrder(List<CartItem> cartItems);
	
	@Transactional
	void clearCart(String customerName);

	Optional<PaymentDetail> getPayment(String customerName);

	List<CartItem> getOrders(String orderId);

	List<Categories> getCategories();



	



	
	

}
