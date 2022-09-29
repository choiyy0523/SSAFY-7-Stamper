package com.ssafy.api.service;

import com.ssafy.api.request.BookGetBookListReq;
import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.BookUpdateStatusReq;
import com.ssafy.db.entity.UserbookCollection;

import java.util.List;

/**
 *	도감 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface BookService {
    UserbookCollection registerUserbookCollection(BookRegisterPostReq bookInfo);

    List<UserbookCollection> getListByGugun(Long userSeq, String gugun);

    List<UserbookCollection> getListByCategory(Long userSeq, String category);

    UserbookCollection getBookStatus(Long userSeq, Long bookSeq);

    UserbookCollection updateBookStatus(BookUpdateStatusReq updateInfo);

    List<UserbookCollection> getAllBookStatus(Long userSeq);
}
