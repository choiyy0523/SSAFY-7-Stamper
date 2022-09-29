package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookGetBookListRes extends BaseResponseBody {

    private List<?> collectedBookList;
    private List<?> totalBookList;

    public static BookGetBookListRes of(Integer statusCode, String messsage, List<?> list1, List<?> list2){
        BookGetBookListRes res = new BookGetBookListRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setCollectedBookList(list1);
        res.setTotalBookList(list2);
        return res;
    }

}
