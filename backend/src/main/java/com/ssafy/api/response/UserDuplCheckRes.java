package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserDuplCheckResponse")
public class UserDuplCheckRes extends BaseResponseBody {

    Boolean checkResult;

    public static UserDuplCheckRes of(Integer statusCode, String message, Boolean checkResult) {
        UserDuplCheckRes res = new UserDuplCheckRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCheckResult(checkResult);
        return res;
    }
}





