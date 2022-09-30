package com.ssafy.db.repository;

import com.ssafy.db.entity.Achieve;
import com.ssafy.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    // Optional<Achieve> findByUserId(String userId);

    //Optional<Comment> findByCommentSeq(Long commentSeq);

    Comment findByCommentSeq(Long commentSeq);

    List<Comment> findByBook_BookSeq(Long bookSeq);
}