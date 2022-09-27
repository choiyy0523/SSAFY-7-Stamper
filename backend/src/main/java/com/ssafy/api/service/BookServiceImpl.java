package com.ssafy.api.service;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.User;
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
        UserbookCollection userbookCollection = new UserbookCollection();

        userbookCollection.setUserbookCollectionGugun(bookInfo.getGugun());

        userbookCollection.setUserbookCollectionImage(bookInfo.getUserbookCollectionImage());

        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
        userbookCollection.setUserbookCollectionDate(df.format(date));

        userbookCollection.setUserbookCollectionCategory(bookInfo.getCategory());

        Book book = new Book();
        book.setBookSeq(bookInfo.getBookSeq());
        userbookCollection.setBook(book);

        User user = new User();
        user.setUserSeq(bookInfo.getUserSeq());
        userbookCollection.setUser(user);

        return userbookCollectionRepository.save(userbookCollection);
    }
}
