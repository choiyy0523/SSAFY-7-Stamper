package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.*;
import com.ssafy.common.auth.SsafyUserDetailService;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    SsafyUserDetailService detailService;

    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 409, message = "중복된 ID"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        String userId = registerInfo.getUserId();  // 내가 회원가입 하려는 ID
        User oUser = userService.getUserByUserId(userId);  // DB 에서 찾아서 user 객체에 넣음
        if (oUser != null) {  // 존재한다면
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재하는 사용자 ID입니다."));
        }

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }


    @GetMapping("/{userId}")
    @ApiOperation(value = "사용자 아이디 중복 체크", notes = "사용자 아이디의 사용 가능 여부를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용 가능"),
            @ApiResponse(code = 409, message = "아이디 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> checkOverlappedUserid(@PathVariable String userId) {
        User user = userService.getUserByUserId(userId);
        if (user != null) {
            return ResponseEntity.status(409).body(UserDuplCheckRes.of(409, "이미 존재하는 사용자 ID입니다.", Boolean.FALSE));
        }
        return ResponseEntity.status(200).body(UserDuplCheckRes.of(200, "사용 가능한 사용자 ID입니다.", Boolean.TRUE));
    }

    @PostMapping("/usernickname")
    @ApiOperation(value = "사용자 닉네임 중복 체크", notes = "사용자 닉네임의 사용 가능 여부를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용 가능"),
            @ApiResponse(code = 409, message = "닉네임 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> checkOverlappedUsernickname(
            @RequestBody @ApiParam(value = "사용자 닉네임 정보", required = true) String userNickname
    ) {
        User user = userService.getUserByUserNickname(userNickname);
        if (user != null){
            return ResponseEntity.status(409).body(UserDuplCheckRes.of(409, "이미 존재하는 사용자 Nickname입니다.", Boolean.FALSE));
        }
        return ResponseEntity.status(200).body(UserDuplCheckRes.of(200, "사용 가능한 사용자 Nickname입니다.", Boolean.TRUE));
    }


    @PostMapping("/find/userid")
    @ApiOperation(value = "아이디 찾기", notes = "이미 가입된 회원의 아이디를 검색한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "일치하는 회원 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findUserId(
            @RequestBody @ApiParam(value = "아이디 찾기", required = true) UserFindUserIdPostReq userInfo
    ) {

        String userName = userInfo.getUserName();  // 내가 입력한 이름
        String userPhone = userInfo.getUserPhone();  // 내가 입력한 전화번호로
        User user = userService.getUserByUserPhone(userPhone);  // 유저 객체를 찾음(없다면 null 값 가능)

        // user 가 빈 값이 아니면서(입력한 전화번호로 가입된 user 객체가 있으면서),
        // 내가 입력한 userName 과 전화번호로 찾은 user 객체의 userName 이 같다면
        if ((user != null) && (userName.equals(user.getUserName()))){
            String userId = user.getUserId();
            return ResponseEntity.status(200).body(UserFindUserIdRes.of(200, "Success", userId));
        }

        // 1. 전화번호는 맞게 입력했으나 이름이 틀린 경우
        // 2. 전화번호가 틀렸고, 이름만 맞은 경우
        // 3. DB 에 입력한 전화번호나 이름이 하나라도 없는 경우
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "일치하는 회원 없음"));
    }


    @PostMapping("/find/userpassword")
    @ApiOperation(value = "비밀번호 찾기(변경)", notes = "비로그인 상태에서 회원의 비밀번호를 변경한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "일치하는 회원 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findUserPassword(
            @RequestBody @ApiParam(value = "비밀번호 찾기", required = true) UserFindUserPasswordPostReq userInfo
    ) {
        String userId = userInfo.getUserId();  // 내가 입력한 아이디
        String userName = userInfo.getUserName();  // 내가 입력한 이름
        String userPhone = userInfo.getUserPhone();  // 내가 입력한 전화번호
        User user = userService.getUserByUserId(userId);  // 유저 객체를 찾음(없다면 null 값 가능)

        // user 가 빈 값이 아니면서(입력한 아이디로 가입된 user 객체가 있으면서),
        // 내가 입력한 userName 과 전화번호로 찾은 user 객체의 userName 이 같다면
        if ((user != null) && (userName.equals(user.getUserName())) && (userPhone.equals(user.getUserPhone()))){
            userService.findUserPassword(userId, userInfo);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }

        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "일치하는 회원 없음"));
    }




    @GetMapping("/profile")
    @ApiOperation(value = "회원 프로필(본인) 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        if (authentication == null){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUserId();
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(UserMeGetRes.of(200, "Success", UserRes.of(user)));
    }

    @PatchMapping()
    @ApiOperation(value = "회원 프로필(본인) 수정", notes = "회원 프로필을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUser(@ApiIgnore Authentication authentication,
                                                             @RequestBody @ApiParam(value = "회원프로필 정보", required = true) UserUpdatePatchReq updateUserInfo) {
        if (authentication == null){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUserId();
        User user = userService.updateUser(userId, updateUserInfo);

        return ResponseEntity.status(200).body(UserMeGetRes.of(200, "Success", UserRes.of(user)));
    }

    @PatchMapping("/password")
    @ApiOperation(value = "비밀번호 수정", notes = "로그인 한 상태에서 비밀번호를 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "현재 비밀번호와 새 비밀번호 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication,
                                                             @RequestBody @ApiParam(value = "비밀번호 수정", required = true) UserPasswordPatchReq passwordInfo) {
        if (authentication == null){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUserId();

        // pw 를 auth 말고 db 에서 뽑는 방식으로 수정함.
        User user = userService.getUserByUserId(userId);
        String userPassword = user.getUserPassword();  // DB 에서 나온 현재 PW


        // 이번에 입력한 현재 비밀번호와 현재 비밀번호가 다르다면
        if (!passwordEncoder.matches(passwordInfo.getCurrentPassword(), userPassword)) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "현재 비밀번호가 틀립니다"));
        }

        // 이번에 입력한 현재 비밀번호와 새 비밀번호가 같다면
        if (passwordInfo.getCurrentPassword().equals(passwordInfo.getNewPassword())) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "현재 비밀번호와 새 비밀번호가 같습니다"));
        }

        // 새 비밀번호 확인(추가사항 - 보류)

        userService.updateUserPassword(userId, passwordInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원정보 삭제(회원탈퇴)", notes = "회원 정보를 삭제(회원탈퇴)한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "권한 없음"),
            @ApiResponse(code = 409, message = "현재 비밀번호 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        String userId = user.getUserId();

        userService.deleteUser(userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/getNickname/{userSeq}")
    @ApiOperation(value = "회원 닉네임 조회", notes = "회원 닉네임을 조회한다")
    public ResponseEntity<? extends BaseResponseBody> getNick(@PathVariable Long userSeq){
        User user = userService.findUserBySeq(userSeq);
        return ResponseEntity.status(200).body(GetUserNicknameRes.of(200, "success", user.getUserName(), user.getUserNickname()));
    }
}
