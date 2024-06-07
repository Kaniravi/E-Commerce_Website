package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long>{

	Optional<Admin> findByEmailId(String emailId);

}
