package com.ssafy.api.service;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.CommentDeletePostReq;
import com.ssafy.api.request.CommentRegisterPostReq;
import com.ssafy.api.request.CommentUpdatePostReq;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.UserbookCollection;

import java.util.List;

/**
 *	도감 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface CommentService {
    Comment registerComment(CommentRegisterPostReq commentInfo);

    Comment updateComment(CommentUpdatePostReq commentInfo);

    Comment deleteComment(Long commentSeq);

    List<Comment> getCommentByBookSeq(Long bookSeq);
}
