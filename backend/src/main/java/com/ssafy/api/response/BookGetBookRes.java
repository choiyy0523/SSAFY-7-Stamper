package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.UserbookCollection;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookGetBookRes extends BaseResponseBody {

    private UserbookCollection userBook;

    public static BookGetBookRes of(Integer statusCode, String messsage, UserbookCollection userBook){
        BookGetBookRes res = new BookGetBookRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setUserBook(userBook);
        return res;
    }

}
