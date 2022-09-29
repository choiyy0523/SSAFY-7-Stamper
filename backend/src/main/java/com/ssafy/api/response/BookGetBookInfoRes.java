package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookGetBookInfoRes extends BaseResponseBody {

    private Book book;

    public static BookGetBookInfoRes of(Integer statusCode, String messsage, Book book){
        BookGetBookInfoRes res = new BookGetBookInfoRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setBook(book);
        return res;
    }

}
