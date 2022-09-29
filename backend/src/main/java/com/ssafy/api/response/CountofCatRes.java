package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CountofCatRes extends BaseResponseBody {

    private List<CatClass> CC;

    public static CountofCatRes of(Integer statusCode, String messsage, List<CatClass> CC){
        CountofCatRes res = new CountofCatRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setCC(CC);
        return res;
    }

}
