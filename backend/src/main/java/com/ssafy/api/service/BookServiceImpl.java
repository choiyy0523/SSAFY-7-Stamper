package com.ssafy.api.service;

import com.ssafy.api.request.BookGetBookListReq;
import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.BookUpdateStatusReq;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserbookCollection;
import com.ssafy.db.repository.UserbookCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;


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

    @Override
    public List<UserbookCollection> getListByGugun(Long userSeq, String gugun) {

        List<UserbookCollection> res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeqAndUserbookCollectionGugun(userSeq, gugun);

        return res;
    }

    @Override
    public List<UserbookCollection> getListByCategory(Long userSeq, String category) {

        List<UserbookCollection> res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeqAndUserbookCollectionCategory(userSeq, category);
        return res;
    }

    @Override
    public UserbookCollection getBookStatus(Long userSeq, Long bookSeq) {

        UserbookCollection res = userbookCollectionRepository.findUserbookCollectionByUser_UserSeqAndBook_BookSeq(userSeq, bookSeq);

        return res;
    }

    @Override
    public UserbookCollection updateBookStatus(BookUpdateStatusReq updateInfo) {

        Long userSeq = updateInfo.getUserSeq();
        Long bookSeq = updateInfo.getBookSeq();
        String imageURL = updateInfo.getImageURL();

        UserbookCollection res = userbookCollectionRepository.findUserbookCollectionByUser_UserSeqAndBook_BookSeq(userSeq, bookSeq);
//        Book book = res.getBook();
//        book.setBookSeq(updateInfo.getBookSeq());
//
//        User user = res.getUser();
//        user.setUserSeq(updateInfo.getUserSeq());


        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
        String time = df.format(date);

//        UserbookCollection userBook = UserbookCollection.builder().book(book).user(user).userbookCollectionDate(time).build();

        res.setUserbookCollectionImage(imageURL);
        res.setUserbookCollectionDate(time);

        System.out.println(res);

        return userbookCollectionRepository.save(res);
    }

    @Override
    public List<UserbookCollection> getAllBookStatus(Long userSeq) {

        List<UserbookCollection> res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeq(userSeq);

        return res;
    }
}
