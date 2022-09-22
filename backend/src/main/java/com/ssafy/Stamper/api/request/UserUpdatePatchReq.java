package com.ssafy.Stamper.api.request;

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
    @ApiModelProperty(name="User Nickname")
    String userNick;
    @ApiModelProperty(name="User Phone")
    String userPhone;
}
