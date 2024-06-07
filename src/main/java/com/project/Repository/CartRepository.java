package com.project.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Cart;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

	List<Cart> findByCustomerName(String customerName);
	@Transactional
	void deleteByCustomerName(String customerName);

}
