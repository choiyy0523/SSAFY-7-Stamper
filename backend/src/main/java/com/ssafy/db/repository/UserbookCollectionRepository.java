package com.ssafy.db.repository;

import com.ssafy.api.response.CatClass;
import com.ssafy.api.response.GugunClass;
import com.ssafy.db.entity.UserbookCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserbookCollectionRepository extends JpaRepository<UserbookCollection, Long> {

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeqAndUserbookCollectionCategory(Long userSeq, String category);

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeqAndUserbookCollectionGugun(Long userSeq, String gugun);

    public UserbookCollection findUserbookCollectionByUser_UserSeqAndBook_BookSeq(Long userSeq, Long bookSeq);

    public List<UserbookCollection> findUserbookCollectionsByUser_UserSeq(Long userSeq);

    // @Query(value = "select book_gugun as gugun, count(case when user_seq = :userSeq and tb_book.book_seq = tb_userbook_collection.book_seq then 1 end) as count, count(*) as total from tb_book, tb_userbook_collection group by book_gugun", nativeQuery = true)
    // public List<GugunClass> getCountGugun(@Param("userSeq") Long userSeq);

    // @Query(value = "select book_maincategory as category, count(case when user_seq = :userSeq and tb_book.book_seq = tb_userbook_collection.book_seq then 1 end) as count, count(*) as total from tb_book, tb_userbook_collection group by book_maincategory", nativeQuery = true)
    // public List<CatClass> getCountCat(@Param("userSeq") Long userSeq);

    @Query(value = "select book_gugun as gugun, count(case when user_seq = :userSeq and tb_book.book_seq = tb_userbook_collection.book_seq then 1 end) as count,count(distinct book_name) as total from tb_book, tb_userbook_collection group by book_gugun order by book_gugun asc", nativeQuery = true)
    public List<GugunClass> getCountGugun(@Param("userSeq") Long userSeq);

    @Query(value = "select book_maincategory as category, count(case when user_seq = :userSeq and tb_book.book_seq = tb_userbook_collection.book_seq then 1 end) as count, count(distinct book_name) as total from tb_book, tb_userbook_collection group by book_maincategory order by book_maincategory asc", nativeQuery = true)
    public List<CatClass> getCountCat(@Param("userSeq") Long userSeq);
}
