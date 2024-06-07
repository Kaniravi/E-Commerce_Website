package com.project.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

	List<Product> findByCategory(String id);

	List<Product> findProductByCategory(String category);


	

}
