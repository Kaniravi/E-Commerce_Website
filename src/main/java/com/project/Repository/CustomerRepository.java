package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

	Optional<Customer> findCustomerByEmailId(String emailId);

}
