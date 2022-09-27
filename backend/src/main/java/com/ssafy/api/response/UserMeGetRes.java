package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserMeGetResponse")
public class UserMeGetRes extends BaseResponseBody {

    UserRes userRes;

    public static UserMeGetRes of(Integer statusCode, String message, UserRes userRes) {
        UserMeGetRes res = new UserMeGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserRes(userRes);
        return res;
    }
}
