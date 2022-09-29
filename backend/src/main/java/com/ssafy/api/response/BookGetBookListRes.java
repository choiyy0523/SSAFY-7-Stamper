package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookGetBookListRes extends BaseResponseBody {

    private List<?> bookList;

    public static BookGetBookListRes of(Integer statusCode, String messsage, List<?> list){
        BookGetBookListRes res = new BookGetBookListRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setBookList(list);
        return res;
    }

}
