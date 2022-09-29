package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPasswordPatchRequest")
public class UserPasswordPatchReq {

    @ApiModelProperty(name="Current Password")
    String currentPassword;

    @ApiModelProperty(name="New Password")
    String newPassword;

    // 새 비밀번호 확인(추가사항 - 보류)


}
