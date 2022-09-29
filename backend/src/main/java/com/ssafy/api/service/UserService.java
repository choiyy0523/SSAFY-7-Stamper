package com.ssafy.api.service;

import com.ssafy.api.request.UserFindUserPasswordPostReq;
import com.ssafy.api.request.UserPasswordPatchReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByUserId(String userId);
    User getUserByUserNickname(String UserNickname);
    User updateUser(String userId, UserUpdatePatchReq userUpdateInfo);
    void deleteUser(String userId);

    User updateUserPassword(String userId, UserPasswordPatchReq passwordInfo);
    User getUserByUserPhone(String userPhone);
    User findUserPassword(String userId, UserFindUserPasswordPostReq userInfo);
    User findUserBySeq(Long userSeq);
}
