package com.cassetete.backend.repository;

import com.cassetete.backend.entity.Combination;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

//As I understand it, create a custom object that inherits from the repo.object in springboot
//We want to be able to reintit the ID counter as well, hence the content of the public interface
public interface CombinationRepository extends JpaRepository<Combination, Long> {

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE COMBINATIONS RESTART IDENTITY", nativeQuery = true)
    void truncateAndResetIds();
}