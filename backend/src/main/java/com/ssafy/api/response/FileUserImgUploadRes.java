package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FileUserImgUploadRes extends BaseResponseBody {

    private String userImgPath;

    public static FileUserImgUploadRes of(Integer statusCode, String messsage, List<String> list){
        FileUserImgUploadRes res = new FileUserImgUploadRes();
        res.setStatusCode(statusCode);
        res.setMessage(messsage);
        res.setUserImgPath(list.get(1));
        return res;
    }

}