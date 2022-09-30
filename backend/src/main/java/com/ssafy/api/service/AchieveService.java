package com.ssafy.api.service;

import com.ssafy.api.request.UpdateAchieveReq;
import com.ssafy.db.entity.Achieve;
import com.ssafy.db.entity.UserAchievement;

import java.util.List;

/**
 *	업적 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface AchieveService {

    List<UserAchievement> getAllAchieve(Long userSeq);

    UserAchievement findByAchieveSeq(Long userSeq, Long achieveSeq);

    UserAchievement updateAchieve(UpdateAchieveReq info);

    Long getAchieveSeqByAchieveName(String achieveName);

}
