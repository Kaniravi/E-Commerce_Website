package com.project.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Entity.Cart;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Customer;
import com.project.Entity.PaymentDetail;
import com.project.Entity.Product;
import com.project.Exception.InsufficientStockException;
import com.project.Model.CustomerModel;
import com.project.Repository.CartItemRepository;
import com.project.Repository.CartRepository;
import com.project.Repository.CategoryRepository;
import com.project.Repository.CustomerRepository;
import com.project.Repository.PaymentDetailRepository;
import com.project.Repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private PaymentDetailRepository paymentDetailRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	

	@Override
	public Customer registerCustomer(CustomerModel customerModel) {
		Customer customer = new Customer();
		customer.setRole(customerModel.getRole());
		customer.setFirstName(customerModel.getFirstName());
		customer.setLastName(customerModel.getLastName());
		customer.setEmailId(customerModel.getEmailId());
		customer.setPassword(customerModel.getPassword());
		customer.setMobileNo(customerModel.getMobileNo());
		customer.setStreet(customerModel.getStreet());
		customer.setCity(customerModel.getCity());
		customer.setPincode(customerModel.getPincode());
		
		return customerRepository.save(customer);
	}

	@Override
	public Optional<Customer> findCustomerByEmailId(String emailId) {
		return customerRepository.findCustomerByEmailId(emailId);
	}

	@Override
	public Optional<Product> fetchProduct(Long id) {
		return productRepository.findById(id);
	}

	@Override
	public List<Product> findProductByCategory(String category) {
		return productRepository.findProductByCategory(category);
	}

	@Override
	public Cart addCart(Cart cart) {
		return cartRepository.save(cart);
	}

	@Override
	public Optional<Product> findProductById(Long id) {
		return productRepository.findById(id);
	}

	@Override
	public Optional<Product> updateProduct(Long id, int decrement) {
		Optional<Product> product = productRepository.findById(id);
		if(product.isPresent()) {
			Product foundProduct = product.get();
			if(foundProduct.getProductQuantity()>= decrement) {
				foundProduct.setProductQuantity(foundProduct.getProductQuantity() - decrement);
				productRepository.save(foundProduct);
				return Optional.of(foundProduct);
			}
			else {
				throw new InsufficientStockException("Not Enough Stock");
			}
		}
		else {
			return Optional.empty();
		}
	}

	@Override
	public List<Cart> fetchCart(String customerName) {
		return cartRepository.findByCustomerName(customerName);
	}

	@Override
	public void removeProduct(Long id) {
		cartRepository.deleteById(id);
		
	}

	@Override
	public PaymentDetail payment(PaymentDetail paymentDetail) {
		return paymentDetailRepository.save(paymentDetail);
	}

	@Override
	public void makeOrder(List<CartItem> cartItems) {
		cartItemRepository.saveAll(cartItems);
	}

	@Transactional
	@Override
	public void clearCart(String customerName) {
		cartRepository.deleteByCustomerName(customerName);
		
	}

	@Override
	public Optional<PaymentDetail> getPayment(String customerName) {
		return paymentDetailRepository.findByCustomerName(customerName);
	}

	@Override
	public List<CartItem> getOrders(String orderId) {
		return cartItemRepository.findByOrderId(orderId);
	}

	@Override
	public List<Categories> getCategories() {
		return categoryRepository.findAll();
	}
	


	
	
}
