package com.ssafy.db.repository;

import com.ssafy.db.entity.UserbookCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserbookCollectionRepository extends JpaRepository<UserbookCollection, Long> {


}
