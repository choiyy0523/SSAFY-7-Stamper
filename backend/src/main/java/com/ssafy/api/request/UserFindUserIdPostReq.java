package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * 아이디 찾기 API ([POST] /api/user/find/userid) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("UserFindUserIdPostRequest")
@Getter
@Setter
public class UserFindUserIdPostReq {
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Phone")
    String userPhone;
}
