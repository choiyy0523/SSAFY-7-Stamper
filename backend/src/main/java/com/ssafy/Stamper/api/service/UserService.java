package com.ssafy.Stamper.api.service;

import com.ssafy.Stamper.api.request.UserFindUserPasswordPostReq;
import com.ssafy.Stamper.api.request.UserPasswordPatchReq;
import com.ssafy.Stamper.api.request.UserRegisterPostReq;
import com.ssafy.Stamper.api.request.UserUpdatePatchReq;
import com.ssafy.Stamper.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByUserId(String userId);
    User updateUser(String userId, UserUpdatePatchReq userUpdateInfo);
    void deleteUser(String userId);

    User updateUserPassword(String userId, UserPasswordPatchReq passwordInfo);
    User getUserByUserPhone(String userPhone);
    User findUserPassword(String userId, UserFindUserPasswordPostReq userInfo);
    User findUserBySeq(Long userSeq);
}
