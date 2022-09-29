package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.UserAchievement;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetAchieveRes extends BaseResponseBody {

    private UserAchievement achievement;

    public static GetAchieveRes of(Integer statusCode, String messsage, UserAchievement achieve){
        GetAchieveRes res = new GetAchieveRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setAchievement(achieve);
        return res;
    }

}
