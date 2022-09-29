package com.ssafy.db.repository;

import com.ssafy.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByBookSeq(Long bookSeq);

    List<Book> findBooksByBookGugun(String gugun);

    List<Book> findBooksByBookMaincategory(String category);
}
