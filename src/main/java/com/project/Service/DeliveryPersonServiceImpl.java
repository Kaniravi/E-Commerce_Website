package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entity.CartItem;
import com.project.Entity.DeliveryPerson;
import com.project.Model.DeliveryPersonModel;
import com.project.Repository.CartItemRepository;
import com.project.Repository.DeliveryPersonRepository;

import jakarta.transaction.Transactional;

@Service
public class DeliveryPersonServiceImpl implements DeliveryPersonService{
	
	@Autowired
	private DeliveryPersonRepository deliveryPersonRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public DeliveryPerson registerDeliveryPerson(DeliveryPersonModel deliveryPersonModel) {
		DeliveryPerson deliveryPerson = new DeliveryPerson();
		deliveryPerson.setRole(deliveryPersonModel.getRole());
		deliveryPerson.setFirstName(deliveryPersonModel.getFirstName());
		deliveryPerson.setLastName(deliveryPersonModel.getLastName());
		deliveryPerson.setEmailId(deliveryPersonModel.getEmailId());
		deliveryPerson.setPassword(deliveryPersonModel.getPassword());
		deliveryPerson.setMobileNo(deliveryPersonModel.getMobileNo());
		deliveryPerson.setStreet(deliveryPersonModel.getStreet());
		deliveryPerson.setCity(deliveryPersonModel.getCity());
		deliveryPerson.setPincode(deliveryPersonModel.getPincode());
		
		return deliveryPersonRepository.save(deliveryPerson);
	}

	@Override
	public List<DeliveryPerson> getAllDeliveryPerson() {
		return deliveryPersonRepository.findAll();
	}

	@Override
	public Optional<DeliveryPerson> getDeliveryPerson(String emailId) {
		return deliveryPersonRepository.findByEmailId(emailId);
	}

	@Override
	public List<CartItem> fetchDeliveries(String deliveryPerson) {
		return cartItemRepository.findByDeliveryPerson(deliveryPerson);
	}

	@Override
	public List<CartItem> getOrder(String orderId) {
		return cartItemRepository.findByOrderId(orderId);
	}

	@Override
	public List<CartItem> findByOrderId(String orderId) {
		return cartItemRepository.findByOrderId(orderId);
	}

	@Override
	public List<CartItem> update(String orderId) {
		return cartItemRepository.findByOrderId(orderId);
	}
    @Transactional
	@Override
	public void save(List<CartItem> items) {
		cartItemRepository.saveAll(items);
		
	}

}
