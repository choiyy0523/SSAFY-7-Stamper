package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * 비밀번호 찾기(변경) API ([POST] /api/user/find/userpassword) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserFindUserPasswordPostRequest")
public class UserFindUserPasswordPostReq {

    @ApiModelProperty(name="User Id")
    String userId;
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Phone")
    String userPhone;
    @ApiModelProperty(name="New Password")
    String newPassword;

}

