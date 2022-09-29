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

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

/**
 *	업적 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service
public class AchieveServiceImpl implements AchieveService {
	@Autowired
	UserAchievementRepository userAchievementRepository;

	@Autowired
	AchieveRepository achieveRepository;

	@Override
	public List<UserAchievement> getAllAchieve(Long userSeq) {
		List<UserAchievement> res = userAchievementRepository.findAchievesByUser_UserSeq(userSeq);

		return res;
	}

	@Override
	public UserAchievement findByAchieveSeq(Long userSeq, Long achieveSeq) {
		// 외래키를 이용해 조회할때는 findBy + FK가 속한 엔티티 + _ + FK 식별자 필드명
		UserAchievement res = userAchievementRepository.findAchieveByUser_UserSeqAndAchieve_AchieveSeq(userSeq, achieveSeq);

		return res;
	}

	@Override
	public UserAchievement updateAchieve(UpdateAchieveReq info) {
		User user = new User();
		user.setUserSeq(info.getUserSeq());

		Achieve achieve = new Achieve();
		achieve.setAchieveSeq(getAchieveSeqByAchieveName(info.getAchieveName()));

		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd a hh:mm:ss zzz");
		String time = df.format(date);

		UserAchievement userAchieve = UserAchievement.builder().achieve(achieve).user(user).time(time).build();

		return userAchievementRepository.save(userAchieve);
	}

	@Override
	public Long getAchieveSeqByAchieveName(String achieveName) {
		Achieve achieve = achieveRepository.findAchieveByAchieveName(achieveName);

		return achieve.getAchieveSeq();
	}
}
