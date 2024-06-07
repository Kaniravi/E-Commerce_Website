package com.project.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CustomerModel {
	private String role;
	private String firstName;
	private String lastName;
	private String emailId;
	private String password;
	private String mobileNo;
	private String street;
	private String city;
	private String pincode;

}
