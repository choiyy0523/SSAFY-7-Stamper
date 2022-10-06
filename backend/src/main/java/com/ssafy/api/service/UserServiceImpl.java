package com.ssafy.api.service;

import com.ssafy.api.request.UserFindUserPasswordPostReq;
import com.ssafy.api.request.UserPasswordPatchReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdatePatchReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setUserName(userRegisterInfo.getUserName());
		user.setUserNickname(userRegisterInfo.getUserNickname());
		user.setUserPhone(userRegisterInfo.getUserPhone());
		user.setUserEmail(userRegisterInfo.getUserEmail());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).orElse(null);
		return user;
	}

	@Override
	public User getUserByUserNickname(String userNickname) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserNickname(userNickname).orElse(null);
		return user;
	}

	public User updateUser(String userId, UserUpdatePatchReq userUpdateInfo){
		User user = getUserByUserId(userId);
		user.setUserName(userUpdateInfo.getUserName());
		user.setUserEmail(userUpdateInfo.getUserEmail());
		user.setUserPhone(userUpdateInfo.getUserPhone());
		user.setUserNickname(userUpdateInfo.getUserNickname());
		return userRepository.save(user);
	}

	@Override
	public User updateUserPassword(String userId, UserPasswordPatchReq passwordInfo) {
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		User user = getUserByUserId(userId);
		user.setUserPassword(passwordEncoder.encode(passwordInfo.getNewPassword()));
		return userRepository.save(user);
	}

	public void deleteUser(String userId){
		User user = getUserByUserId(userId);
		userRepository.delete(user);
	}

	public User getUserByUserPhone(String userPhone){
		// 디비에 유저 정보 조회 (userPhone 를 통한 조회).
		User user = userRepositorySupport.findUserByUserPhone(userPhone).orElse(null);
		return user;
	}


	public User findUserPassword(String userId, UserFindUserPasswordPostReq userInfo) {
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		User user = getUserByUserId(userId);
		user.setUserPassword(passwordEncoder.encode(userInfo.getNewPassword()));
		return userRepository.save(user);
	}

	@Override
	public User findUserBySeq(Long userSeq) {
		User user= userRepository.findById(userSeq).get();
		return user;
	}


//	@Transactional
//	public void checkUsernameDuplication(UserRequestDto dto) {
//		boolean usernameDuplicate = userRepository.existsByUserId(dto.toEntity().getUsername());
//		if (usernameDuplicate) {
//			throw new IllegalStateException("이미 존재하는 아이디입니다.");
//		}
//	}
//	@Transactional
//	public void checkNicknameDuplication(UserRequestDto dto) {
//		boolean nicknameDuplicate = userRepository.existsByUserNick(dto.toEntity().getNickname());
//		if (nicknameDuplicate) {
//			throw new IllegalStateException("이미 존재하는 닉네임입니다.");
//		}
//	}

}
