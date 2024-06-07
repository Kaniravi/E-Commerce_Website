package com.project.Entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PaymentDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String orderId;
	private Date orderDate;
	private String customerName;
	private String nameOnCard;
	private int cardNumber;
	private Date validThrough;
	private int cvv;

}
