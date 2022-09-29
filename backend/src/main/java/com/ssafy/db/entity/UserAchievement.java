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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achieve_seq")
    private Achieve achieve;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "userAchievement_time")
    private String userAchievementTime;

    @Builder
    public UserAchievement(Achieve achieve, User user, String time){
        this.achieve = achieve;
        this.user = user;
        this.userAchievementTime = time;
    }
}
