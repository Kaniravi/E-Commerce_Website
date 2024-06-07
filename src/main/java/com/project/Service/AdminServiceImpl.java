package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entity.Admin;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Product;
import com.project.Model.AdminModel;
import com.project.Repository.AdminRepository;
import com.project.Repository.CartItemRepository;
import com.project.Repository.CategoryRepository;
import com.project.Repository.ProductRepository;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public Admin registerAdmin(AdminModel adminModel) {
		Admin admin = new Admin();
		admin.setRole(adminModel.getRole());
		admin.setFirstName(adminModel.getFirstName());
		admin.setLastName(adminModel.getLastName());
		admin.setEmailId(adminModel.getEmailId());
		admin.setPassword(adminModel.getPassword());
		admin.setMobileNo(adminModel.getMobileNo());
		admin.setStreet(adminModel.getStreet());
		admin.setCity(adminModel.getCity());
		admin.setPincode(adminModel.getPincode());
		
		return adminRepository.save(admin);

		
	}

	@Override
	public Optional<Admin> getAdmin(String emailId) {
		return adminRepository.findByEmailId(emailId);
	}

	@Override
	public Categories addCategory(Categories category) {
		return categoryRepository.save(category);
	}

	@Override
	public List<Categories> getCategory() {
		return categoryRepository.findAll();
	}

	@Override
	public Product addProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public List<Product> findProductByCategory(String id) {
		return productRepository.findByCategory(id);
	}

	@Override
	public List<Product> getAllCategory() {
		return productRepository.findAll();
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public List<CartItem> getAllOrders() {
		return cartItemRepository.findAll();
	}

	@Override
	public List<CartItem> getOrders(String orderId) {
		return cartItemRepository.findByOrderId(orderId);
	}

	@Override
	public List<CartItem> updateCart(String orderId, String deliveryPerson) {
		List<CartItem> items = cartItemRepository.findByOrderId(orderId);
		for(CartItem item : items ) {
			item.setDeliveryPerson(deliveryPerson);
		}
		return cartItemRepository.saveAll(items);
	}

}
