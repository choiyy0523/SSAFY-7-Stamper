package com.ssafy.db.repository;

import com.ssafy.db.entity.Achieve;
import com.ssafy.db.entity.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchieveRepository extends JpaRepository<Achieve, Long> {

    Achieve findAchieveByAchieveName(String achieveName);
}