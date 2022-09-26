package com.ssafy.api.service;

// import com.ssafy.api.request.UserFindUserPasswordPostReq;
// import com.ssafy.api.request.UserPasswordPatchReq;
// import com.ssafy.api.request.UserRegisterPostReq;
// import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.db.entity.Achieve;

import java.util.List;

/**
 *	업적 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface AchieveService {

    List<Achieve> getAllAchieve();
    List<Achieve> getAchieveListByTheme(String mainCat);
    List<Achieve> getAchieveListByGugun(String gugun);

    Achieve findByAchieveSeq(Long achieveSeq);
}
