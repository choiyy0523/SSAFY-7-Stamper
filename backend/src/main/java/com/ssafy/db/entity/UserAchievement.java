package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_userAchievement")
public class UserAchievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAchievementSeq = null;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achieve_seq")
    private Achieve achievement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "userAchievement_time")
    private String userAchievementTime;

}
