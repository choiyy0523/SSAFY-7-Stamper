package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class CountofGugunRes extends BaseResponseBody {

    private List<GugunClass> GC;

    public static CountofGugunRes of(Integer statusCode, String messsage, List<GugunClass> GC){
        CountofGugunRes res = new CountofGugunRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setGC(GC);
        return res;
    }

}
