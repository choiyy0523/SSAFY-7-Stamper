package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/users/profile) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
//	@ApiModelProperty(name="User ID")
//	String userId;
//	@ApiModelProperty(name="User Password")
//	String userPassword;
	Long userSeq;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Email")
	String userEmail;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Nickname")
	String userNickname;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
//		res.setUserId(user.getUserId());
//		res.setUserPassword(user.getUserPassword());
		res.setUserSeq(user.getUserSeq());
		res.setUserName(user.getUserName());
		res.setUserEmail(user.getUserEmail());
		res.setUserPhone(user.getUserPhone());
		res.setUserNickname(user.getUserNickname());
		return res;
	}
}
