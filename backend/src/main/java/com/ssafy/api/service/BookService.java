package com.ssafy.api.service;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserbookCollection;

/**
 *	도감 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface BookService {
    UserbookCollection registerUserbookCollection(BookRegisterPostReq bookInfo);
}
