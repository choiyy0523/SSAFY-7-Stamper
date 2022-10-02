package com.ssafy.api.service;

import com.ssafy.api.request.BookGetBookListReq;
import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.BookUpdateStatusReq;
import com.ssafy.api.response.CatClass;
import com.ssafy.api.response.GugunClass;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserbookCollection;
import com.ssafy.db.repository.BookRepository;
import com.ssafy.db.repository.UserbookCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service("bookService")
public class BookServiceImpl implements BookService{
    @Autowired
    UserbookCollectionRepository userbookCollectionRepository;

    @Autowired
    BookRepository bookRepository;

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

//        String newGugun = "";
//        List<UserbookCollection> res = new ArrayList<>();
//
//        try {
//            newGugun = URLDecoder.decode(gugun, "UTF-8");
//            System.out.println("newGugun : " + newGugun);
//            res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeqAndUserbookCollectionGugun(userSeq, newGugun);
//        } catch (Exception e){
//            System.out.println(e);
//        }

        List<UserbookCollection> res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeqAndUserbookCollectionGugun(userSeq, gugun);

        return res;
    }

    @Override
    public List<UserbookCollection> getListByCategory(Long userSeq, String category) {

//        System.out.println("category : " + category);
//        String newCategory = "";
//        List<UserbookCollection> res = new ArrayList<>();
//
//        try {
//            newCategory = URLDecoder.decode(category, "UTF-8");
//            System.out.println("newCategory : " + newCategory);
//            res = userbookCollectionRepository.findUserbookCollectionsByUser_UserSeqAndUserbookCollectionCategory(userSeq, newCategory);
//        } catch (Exception e){
//            System.out.println(e);
//        }

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

    @Override
    public List<GugunClass> getbookCountofGugun(Long userSeq){
        List<GugunClass> res = userbookCollectionRepository.getCountGugun(userSeq);
        return res;
    }

    @Override
    public List<CatClass> getbookCountofCat(Long userSeq){
        List<CatClass> res = userbookCollectionRepository.getCountCat(userSeq);
        return res;
    }

    @Override
    public Book getBookInfo(Long bookSeq) {
        Book res = bookRepository.findByBookSeq(bookSeq).orElse(null);

        return res;
    }

    @Override
    public List<Book> getAllBookInfo() {
        List<Book> res = bookRepository.findAll();

        return res;
    }

    @Override
    public List<Book> getBookInfoByGugun(String gugun) {
        List<Book> res = bookRepository.findBooksByBookGugun(gugun);

        return res;
    }

    @Override
    public List<Book> getBookInfoByCategory(String category) {
        List<Book> res = bookRepository.findBooksByBookMaincategory(category);

        return res;
    }

    @Override
    public boolean updateUserImgUrl(String url, Long userSeq, Long bookSeq) {
        UserbookCollection userbook = userbookCollectionRepository.findUserbookCollectionByUser_UserSeqAndBook_BookSeq(userSeq, bookSeq);

        if(userbook != null){
            if(url != "") userbook.setUserbookCollectionImage(url);
            else userbook.setUserbookCollectionImage(null);

            userbookCollectionRepository.save(userbook);
            return true;
        } else {
            return false;
        }
    }
}
