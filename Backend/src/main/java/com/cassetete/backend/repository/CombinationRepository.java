package com.cassetete.backend.repository;

import com.cassetete.backend.entity.Combination;
import org.springframework.data.jpa.repository.JpaRepository;


//As I understand it, create a custom object that inherits from the repo.object in springboot
public interface CombinationRepository extends JpaRepository<Combination, Long> {}