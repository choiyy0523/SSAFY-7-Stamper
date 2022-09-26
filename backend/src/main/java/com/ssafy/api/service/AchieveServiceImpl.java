package com.ssafy.api.service;

// import com.ssafy.api.request.UserFindUserPasswordPostReq;
// import com.ssafy.api.request.UserPasswordPatchReq;
// import com.ssafy.api.request.UserRegisterPostReq;
// import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.db.entity.Achieve;
import com.ssafy.db.repository.AchieveRepository;
// import com.ssafy.db.repository.UserRepository;
// import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *	업적 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("achieveService")
public class AchieveServiceImpl implements AchieveService {
	@Autowired
	AchieveRepository achieveRepository;

//	@Override
//	public User createUser(UserRegisterPostReq userRegisterInfo) {
//		User user = new User();
//		user.setUserId(userRegisterInfo.getUserId());
//		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
//		user.setUserName(userRegisterInfo.getUserName());
//		user.setUserNickname(userRegisterInfo.getUserNickname());
//		user.setUserPhone(userRegisterInfo.getUserPhone());
//		return userRepository.save(user);
//	}


}
