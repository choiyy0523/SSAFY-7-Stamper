package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.UserAchievement;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.sql.Update;

import java.util.List;

@Getter
@Setter
public class UpdateAchieveRes extends BaseResponseBody {

    private Long achieveSeq;

    public static UpdateAchieveRes of(Integer statusCode, String messsage, Long achieveSeq){
        UpdateAchieveRes res = new UpdateAchieveRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setAchieveSeq(achieveSeq);
        return res;
    }

}
