package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserNicknameRes extends BaseResponseBody {
//    User user;

//    UserParticipantsRes userParticipantsRes;
    private String userName;
    private String userNick;
    public static GetUserNicknameRes of(Integer statusCode, String message, String userName, String userNick){
        GetUserNicknameRes res = new GetUserNicknameRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserName(userName);
        res.setUserNick(userNick);
        return res;
    }
}
