package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Comment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentRes extends BaseResponseBody {
    private List<Comment> list;

    public static CommentRes of(Integer statusCode, String message, List<Comment> list){
        CommentRes res = new CommentRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }

}
