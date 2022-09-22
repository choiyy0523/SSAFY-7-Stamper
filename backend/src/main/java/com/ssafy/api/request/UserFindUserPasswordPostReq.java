package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

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

