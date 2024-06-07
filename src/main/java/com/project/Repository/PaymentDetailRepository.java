package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.PaymentDetail;

@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetail,Long> {

	Optional<PaymentDetail> findByCustomerName(String customerName);

}
