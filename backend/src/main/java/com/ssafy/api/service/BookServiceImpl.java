package com.ssafy.api.service;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.UserbookCollection;
import com.ssafy.db.repository.UserbookCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;


@Service("bookService")
public class BookServiceImpl implements BookService{
    @Autowired
    UserbookCollectionRepository userbookCollectionRepository;

    @Override
    public UserbookCollection registerUserbookCollection(BookRegisterPostReq bookInfo) {
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
        UserbookCollection book = new UserbookCollection();
        book.setUserbookCollectionGugun(bookInfo.getGugun());
        book.setUserbookCollectionImage(bookInfo.getUserbookCollectionImage());
        book.setUserbookCollectionDate(df.format(date));
        book.setUserbookCollectionCategory(bookInfo.getCategory());
        Book b = new Book();
        b.setBookSeq(bookInfo.getBookSeq());
        book.setBook(b);
        return userbookCollectionRepository.save(book);
    }
}
