package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/user/signup) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="User Password")
	String userPassword;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Email")
	String userEmail;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Nickname")
	String userNickname;

}
