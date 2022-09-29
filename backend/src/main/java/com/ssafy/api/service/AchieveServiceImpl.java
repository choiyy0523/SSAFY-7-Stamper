package com.ssafy.api.service;

// import com.ssafy.api.request.UserFindUserPasswordPostReq;
// import com.ssafy.api.request.UserPasswordPatchReq;
// import com.ssafy.api.request.UserRegisterPostReq;
// import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.api.request.UpdateAchieveReq;
import com.ssafy.db.entity.Achieve;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserAchievement;
import com.ssafy.db.repository.AchieveRepository;
// import com.ssafy.db.repository.UserRepository;
// import com.ssafy.db.repository.UserRepositorySupport;
import com.ssafy.db.repository.UserAchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 *	업적 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
public class AchieveServiceImpl implements AchieveService {
	@Autowired
	UserAchievementRepository userAchievementRepository;

	@Override
	public List<UserAchievement> getAllAchieve(Long userSeq) {
		List<UserAchievement> res = userAchievementRepository.findAchievesByUserSeq(userSeq);

		return res;
	}

	@Override
	public UserAchievement findByAchieveSeq(Long userSeq, Long achieveSeq) {
		// 외래키를 이용해 조회할때는 findBy + FK가 속한 엔티티 + _ + FK 식별자 필드명
		UserAchievement res = userAchievementRepository.findAchieveByUserSeqAndAchieveSeq(userSeq, achieveSeq);

		return res;
	}

	@Override
	public UserAchievement updateAchieve(UpdateAchieveReq info) {
		Long achieveSeq = info.getAchieveSeq();

		Long userSeq = info.getUserSeq();

		LocalDate now = LocalDate.now();
		DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
		String time = now.format(timeFormatter);

		UserAchievement userAchieve = UserAchievement.builder().achieveSeq(achieveSeq).userSeq(userSeq).time(time).build();

		return userAchievementRepository.save(userAchieve);
	}
}
