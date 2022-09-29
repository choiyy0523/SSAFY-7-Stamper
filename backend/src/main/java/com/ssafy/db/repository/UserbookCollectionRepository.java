package com.ssafy.db.repository;

import com.ssafy.db.entity.UserbookCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserbookCollectionRepository extends JpaRepository<UserbookCollection, Long> {

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeqAndUserbookCollectionCategory(Long userSeq, String category);

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeqAndUserbookCollectionGugun(Long userSeq, String gugun);

    public UserbookCollection findUserbookCollectionByUser_UserSeqAndBook_BookSeq(Long userSeq, Long bookSeq);

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeq(Long userSeq);
}
