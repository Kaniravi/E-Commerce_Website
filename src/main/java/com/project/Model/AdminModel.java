package com.project.Model;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AdminModel {
	
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
