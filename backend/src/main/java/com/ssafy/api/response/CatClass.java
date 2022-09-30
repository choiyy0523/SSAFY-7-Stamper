package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

public interface CatClass {

    String getCategory();
    int getCount();
    int getTotal();

}
