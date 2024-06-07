package com.project.Entity;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartItem {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		  private String orderId;

		    private Long productId;
		    
		    private String customerName;
		    
		    @Column(length = 1000000)
		    private String productImage;

		    private String productTitle;

		    private String productDescription;

		    private int productSelectedQuantity;

		    private int productPrice;
		    
		    private Date orderDate;
		    
		    private String deliveryStatus;
		    
		    private String deliveryPerson;
		    
		    private String deliveryTime;
		   
		    private String deliveryMobileNo;
		   
		    private String deliveryDate;
		    
		    private String street;
		    
		    private String city;
		    
		    private String pincode;
		    
		    private String mobileNo;
		    
		    
		  
		   
}
