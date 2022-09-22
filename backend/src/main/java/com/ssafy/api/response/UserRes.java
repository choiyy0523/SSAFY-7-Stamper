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
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Nickname")
	String userNick;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	Long userSeq;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
//		res.setUserId(user.getUserId());
//		res.setUserPassword(user.getUserPassword());
		res.setUserName(user.getUserName());
		res.setUserNick(user.getUserNickname());
		res.setUserPhone(user.getUserPhone());
		res.setUserSeq(user.getUserSeq());


		return res;
	}
}
