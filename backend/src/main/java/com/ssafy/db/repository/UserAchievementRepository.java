package com.ssafy.db.repository;

import com.ssafy.db.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {

    // 업적 전체 조회
    public List<UserAchievement> findAchievesByUser_UserSeq(Long userSeq);

    // 특정 업적 조회
    public UserAchievement findAchieveByUser_UserSeqAndAchieve_AchieveSeq(Long userSeq, Long achieveSeq);

    // 업적 등록
}