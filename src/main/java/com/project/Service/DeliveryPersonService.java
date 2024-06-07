package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.Entity.CartItem;
import com.project.Entity.DeliveryPerson;
import com.project.Model.DeliveryPersonModel;

import jakarta.transaction.Transactional;

@Service
public interface DeliveryPersonService {

	DeliveryPerson registerDeliveryPerson(DeliveryPersonModel deliveryPersonModel);

	List<DeliveryPerson> getAllDeliveryPerson();

	Optional<DeliveryPerson> getDeliveryPerson(String emailId);

	List<CartItem> fetchDeliveries(String deliveryPerson);

	List<CartItem> getOrder(String orderId);

	List<CartItem> findByOrderId(String orderId);

	List<CartItem> update(String orderId);
	
	@Transactional
	void save(List<CartItem> items);

}
