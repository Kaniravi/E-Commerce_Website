package com.project.WebConfig;
import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    private static final String[] WHITE_LIST_URLS = {"/admin/adminRegister","/admin/getAdmin/{emailId}","/customer/customerRegister"
    		,"/deliveryPerson/registerDeliveryPerson","/admin/addCategory","/admin/getCategory","/admin/addProduct","/admin/getProduct/{id}"
    		,"/admin/getAllProduct","/admin/getAllProducts","/customer/getCustomer/{emailId}","/customer/fetchCategory/{id}","/customer/getCategory/{category}"
    			,"/customer/addCart", "/customer/updateProduct/{id}", "/customer/fetchCart/{customerName}","/customer/removeProduct/{id}",
    			"/customer/paymentDetail","/customer/postOrder","/customer/cartItems","/customer/clearCart/{customerName}"
    			,"/customer/getPayment/{customerName}","/customer/getOrders/{orderId}","/admin/getAllOrders","/admin/getAllOrders/{orderId}"
    			,"/deliveryPerson/getAllDeliveryPerson","/admin/assignDeliveryPerson","/deliveryPerson/getDeliveryPerson/{emailId}",
    			"/deliveryPerson/fetchDeliveries/{deliveryPerson}","/deliveryPerson/getDelivery/{orderId}",
    			"/deliveryPerson/updateCart/{orderId}","/customer/getCategories"};

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(WHITE_LIST_URLS).permitAll() // Use antMatchers here
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(Customizer.withDefaults())
                .build();
    }


 
 



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("Content-Type");
        configuration.addAllowedOrigin("http://localhost:3000"); 
        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST",  "DELETE")); // Include all necessary methods
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}

