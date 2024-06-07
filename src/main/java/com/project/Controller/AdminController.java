package com.project.Controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.Entity.Admin;
import com.project.Entity.CartItem;
import com.project.Entity.Categories;
import com.project.Entity.Product;
import com.project.Model.AdminModel;
import com.project.Service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/adminRegister")
	public Admin registerAdmin(@RequestBody AdminModel adminModel) {
		Admin admin = adminService.registerAdmin(adminModel);
		return admin;
		
	}
	
	@GetMapping("/getAdmin/{emailId}")
	public ResponseEntity<Admin> getAdmin(@PathVariable String emailId){
		Optional<Admin> admin  = adminService.getAdmin(emailId);
		if(admin.isPresent()) {
			return ResponseEntity.ok(admin.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/addCategory")
	public Categories addCategory(@RequestBody Categories category) {
		Categories addedCategory = adminService.addCategory(category);
		return addedCategory;
	}
	
	@GetMapping("/getCategory")
	public List<Categories> getCategory(){
		List<Categories> listCategory = adminService.getCategory();
		return listCategory;
	}
	
	@PostMapping("/addProduct")
	public Product addProduct(@RequestParam("productTitle") String productTitle,
							  @RequestParam("productDescription") String productDescription,
							  @RequestParam("category") String category,
							  @RequestParam("productQuantity") int productQuantity,
							  @RequestParam("productPrice") int productPrice,
							  @RequestParam("productImage") MultipartFile productImage) throws IOException {
		Product product = new Product();
		byte bytes[] = productImage.getBytes();
		String encodedImage = Base64.getEncoder().encodeToString(bytes);
		
		product.setProductTitle(productTitle);
		product.setProductDescription(productDescription);
		product.setCategory(category);
		product.setProductQuantity(productQuantity);
		product.setProductPrice(productPrice);
		product.setProductImage(encodedImage);
		
		Product addedProduct = adminService.addProduct(product);
		return addedProduct;
	}
	
	@GetMapping("/getProduct/{id}")
	public ResponseEntity<List<Product>> findProductByCategory(@PathVariable String id){
		List<Product> product = adminService.findProductByCategory(id);
		if(!product.isEmpty()) {
			return ResponseEntity.ok(product);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/getAllProduct")
	public List<Product> getAllProduct(){
		List<Product> product  = adminService.getAllCategory();
		return product;
	}
	
	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts() {
		List<Product> products = adminService.getAllProducts();
		return products;
	}
	
	@GetMapping("/getAllOrders")
	public List<CartItem> getAllOrders(){
		List<CartItem> cartItems = adminService.getAllOrders();
		return cartItems;
	}
	
	@GetMapping("/getAllOrders/{orderId}")
	public ResponseEntity<List<CartItem>> getOrders(@PathVariable String orderId){
		List<CartItem> cartItems = adminService.getOrders(orderId);
		if(!cartItems.isEmpty()) {
			return ResponseEntity.ok(cartItems);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/assignDeliveryPerson")
	public ResponseEntity<List<CartItem>> updateCart(@RequestBody Map<String,String> request){
		try {
			String orderId = request.get("orderId");
			String deliveryPerson = request.get("deliveryPerson");
			List<CartItem> item = adminService.updateCart(orderId, deliveryPerson);
			return ResponseEntity.ok(item);
		}
		catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
		
	}
}
