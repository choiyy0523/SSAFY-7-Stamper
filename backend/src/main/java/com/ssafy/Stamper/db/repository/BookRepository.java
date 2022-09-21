package com.ssafy.Stamper.db.repository;

import com.ssafy.Stamper.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByBookSeq(Long bookSeq);
}
