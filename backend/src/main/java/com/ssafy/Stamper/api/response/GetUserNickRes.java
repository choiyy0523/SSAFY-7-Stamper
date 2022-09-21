package com.ssafy.Stamper.api.response;

import com.ssafy.Stamper.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserNickRes extends BaseResponseBody {
//    User user;

//    UserParticipantsRes userParticipantsRes;
    private String userName;
    private String userNick;
    public static GetUserNickRes of(Integer statusCode, String message, String userName, String userNick){
        GetUserNickRes res = new GetUserNickRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserName(userName);
        res.setUserNick(userNick);
        return res;
    }
}
