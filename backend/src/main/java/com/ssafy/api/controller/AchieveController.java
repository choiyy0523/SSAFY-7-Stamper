package com.ssafy.api.controller;


import com.ssafy.api.request.UpdateAchieveReq;
import com.ssafy.api.response.GetAchieveListRes;
import com.ssafy.api.response.GetAchieveRes;
import com.ssafy.api.response.UpdateAchieveRes;
import com.ssafy.api.service.AchieveService;
import com.ssafy.api.service.BookService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Achieve;
import com.ssafy.db.entity.Book;
import com.ssafy.db.entity.UserAchievement;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "업적 API", tags = {"Achieve"})
@RestController
@RequestMapping("/api/achieve")
public class AchieveController {

    @Autowired
    AchieveService achieveService;

    @Autowired
    BookService bookService;

    @GetMapping("/{userSeq}")
    @ApiOperation(value = "업적 전체 조회", notes = "userSeq 이용해서 달성한 업적 전체를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "달성한 업적 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAchieveList(@ApiIgnore Authentication authentication, @PathVariable Long userSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        List<UserAchievement> res = new ArrayList<>();
        res = achieveService.getAllAchieve(userSeq);

        if(res.size() > 0){
            return ResponseEntity.status(200).body(GetAchieveListRes.of(200, "업적 리스트 조회 성공", res));
        } else{
            return ResponseEntity.status(409).body(GetAchieveListRes.of(409, "달성한 업적 없음"));
        }


    }

    @GetMapping("/{userSeq}/{achieveSeq}")
    @ApiOperation(value = "특정 업적 조회", notes = "userSeq, achieveSeq 이용해서 특정 업적을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "달성하지 못한 업적"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAchieve(@ApiIgnore Authentication authentication, @PathVariable Long userSeq, @PathVariable Long achieveSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        UserAchievement res = achieveService.findByAchieveSeq(userSeq, achieveSeq);

        if(res == null){
            return ResponseEntity.status(409).body(GetAchieveRes.of(409, "달성하지 못한 업적"));
        } else {
            return ResponseEntity.status(200).body(GetAchieveRes.of(200, "업적 조회 성공", res));
        }


    }


    @PostMapping("/update")
    @ApiOperation(value = "업적 등록", notes = "사용자의 업적 상태를 갱신한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "이미 갱신된 업적"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateAchieve(@ApiIgnore Authentication authentication, @RequestBody UpdateAchieveReq info){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }
        
        achieveService.updateAchieve(info);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "업적 갱신 성공"));
    }
}
