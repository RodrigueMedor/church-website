package com.fhbck.church.repository;

import com.fhbck.church.entity.Pastor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PastorRepository extends JpaRepository<Pastor, Long> {
    List<Pastor> findAllByOrderByCreatedAtAsc();
}
