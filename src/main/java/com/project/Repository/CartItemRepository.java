package com.project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.CartItem;

import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {

	List<CartItem> findByOrderId(String orderId);

	
    @Transactional
	List<CartItem> findByDeliveryPerson(String deliveryPerson);

}
