package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.Entity.Admin;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Product;
import com.project.Model.AdminModel;


@Service
public interface AdminService {

	Admin registerAdmin(AdminModel adminModel);

	Optional<Admin> getAdmin(String emailId);

	Categories addCategory(Categories category);

	List<Categories> getCategory();

	Product addProduct(Product product);

	

	List<Product> findProductByCategory(String id);

	List<Product> getAllCategory();

	List<Product> getAllProducts();

	List<CartItem> getAllOrders();

	List<CartItem> getOrders(String orderId);

	List<CartItem> updateCart(String orderId, String deliveryPerson);

	

}
