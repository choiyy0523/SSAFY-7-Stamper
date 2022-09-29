package com.ssafy.db.repository;

import com.ssafy.db.entity.UserbookCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserbookCollectionRepository extends JpaRepository<UserbookCollection, Long> {

    public List<UserbookCollection> findUserbookCollectionsByUserSeqAndUserbookCollectionCategory(Long userSeq, String category);

    public List<UserbookCollection> findUserbookCollectionsByUserSeqAndUserbookCollectionGugun(Long userSeq, String gugun);

    public UserbookCollection findUserbookCollectionByUserSeqAndBookSeq(Long userSeq, Long bookSeq);

    public List<UserbookCollection> findUserbookCollectionsByUserSeq(Long userSeq);
}
