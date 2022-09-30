package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetAchieveListRes extends BaseResponseBody {

    private List<?> achieveList;

    public static GetAchieveListRes of(Integer statusCode, String messsage, List<?> list){
        GetAchieveListRes res = new GetAchieveListRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setAchieveList(list);
        return res;
    }

}
