package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindUserIdResponse")
public class UserFindUserIdRes extends BaseResponseBody {

    String userId;

    public static UserFindUserIdRes of(Integer statusCode, String message, String userId) {
        UserFindUserIdRes res = new UserFindUserIdRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserId(userId);
        return res;
    }
}


