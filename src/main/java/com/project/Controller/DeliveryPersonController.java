package com.project.Controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.project.Entity.CartItem;
import com.project.Entity.DeliveryPerson;
import com.project.Model.DeliveryPersonModel;
import com.project.Service.DeliveryPersonService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/deliveryPerson")
public class DeliveryPersonController {
	
	@Autowired
	private DeliveryPersonService deliveryPersonService;
	
	@PostMapping("/registerDeliveryPerson")
	public DeliveryPerson registerDeliveryPerson(@RequestBody DeliveryPersonModel deliveryPersonModel) {
		DeliveryPerson delivery = deliveryPersonService.registerDeliveryPerson(deliveryPersonModel);
		return delivery;
	}
	
	@GetMapping("/getAllDeliveryPerson")
	public List<DeliveryPerson> getAllDeliveryPerson(){
		List<DeliveryPerson> deliveryPerson = deliveryPersonService.getAllDeliveryPerson();
		return deliveryPerson;
	}
	
	@GetMapping("/getDeliveryPerson/{emailId}")
	public ResponseEntity<DeliveryPerson> getDeliveryPerson(@PathVariable String emailId){
		Optional<DeliveryPerson> user = deliveryPersonService.getDeliveryPerson(emailId);
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
					
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	@GetMapping("/fetchDeliveries/{deliveryPerson}")
	public ResponseEntity<List<CartItem>> fetchDeliveries(@PathVariable String deliveryPerson){
		List<CartItem> items = deliveryPersonService.fetchDeliveries(deliveryPerson);
		if(!items.isEmpty()) {
			return ResponseEntity.ok(items);
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
	@GetMapping("/getDelivery/{orderId}")
	public ResponseEntity<List<CartItem>> getDelivery(@PathVariable String orderId){
		List<CartItem> items = deliveryPersonService.getOrder(orderId);
		if(!items.isEmpty()) {
			return ResponseEntity.ok(items);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/updateCart/{orderId}")
	public void updateCart(@PathVariable String orderId,@RequestBody Map<String, String> request) {
		String deliveryStatus = request.get("deliveryStatus");
		String deliveryTime = request.get("deliveryTime");
		String deliveryDate = request.get("deliveryDate");
		String deliveryMobileNo = request.get("deliveryMobileNo");
		List<CartItem> items = deliveryPersonService.update(orderId);
		for(CartItem item : items) {
			item.setDeliveryDate(deliveryDate);
			item.setDeliveryTime(deliveryTime);
			item.setDeliveryStatus(deliveryStatus);
			item.setDeliveryMobileNo(deliveryMobileNo);
		}
		deliveryPersonService.save(items);
	}

}
