package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("UserFindUserIdPostRequest")
@Getter
@Setter
public class UserFindUserIdPostReq {
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Phone")
    String userPhone;
}
