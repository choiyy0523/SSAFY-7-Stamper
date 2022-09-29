package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@Data
@Entity
@DynamicUpdate
@Table(name = "tb_userAchievement")
public class UserAchievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAchievementSeq = null;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Achieve.class)
    @JoinColumn(name = "achieve_seq")
    private Long achieveSeq;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private Long userSeq;

    @Column(name = "userAchievement_time")
    private String userAchievementTime;

    @Builder
    public UserAchievement(Long achieveSeq, Long userSeq, String time){
        this.achieveSeq = achieveSeq;
        this.userSeq = userSeq;
        this.userAchievementTime = time;
    }
}
