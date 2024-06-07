package com.project.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Categories {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
   private String categoryTitle;
   private String categoryDescription;
   
   @OneToMany(mappedBy ="categories", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private List<Product> products;
}
