package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserUpdatePatchRequest")
public class UserUpdatePatchReq {
    @ApiModelProperty(name="User Name")
    String userName;
    @ApiModelProperty(name="User Email")
    String userEmail;
    @ApiModelProperty(name="User Phone")
    String userPhone;
    @ApiModelProperty(name="User Nickname")
    String userNickname;
}
