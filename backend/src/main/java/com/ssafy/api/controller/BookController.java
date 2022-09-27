package com.ssafy.api.controller;

import com.ssafy.api.request.BookGetBookListReq;
import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.BookUpdateStatusReq;
import com.ssafy.api.response.BookGetBookListRes;
import com.ssafy.api.response.BookGetBookRes;
import com.ssafy.api.response.GetAchieveRes;
import com.ssafy.api.service.BookService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.UserbookCollection;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

/**
 * 도감(Book) 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "도감(Book) API", tags = {"Book"})
@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;

    @PostMapping("/register")
    @ApiOperation(value = "랜드마크 등록", notes = "랜드마크를 등록한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "랜드마크 등록", required = true) BookRegisterPostReq bookInfo
    ) {
        bookService.registerUserbookCollection(bookInfo);
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }


    @GetMapping("/listbygu/{userSeq}/{gugun}")
    @ApiOperation(value = "구별 조회", notes = "특정 구의 수집 현황을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getListByGugun(@PathVariable Long userSeq, @PathVariable String gugun){

        List<UserbookCollection> res = bookService.getListByGugun(userSeq, gugun);

        if(res.size() > 0){
            return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "구별 리스트 조회 성공", res));
        } else{
            return ResponseEntity.status(409).body(BookGetBookListRes.of(409, "수집한 랜드마크 없음"));
        }
    }

    @GetMapping("/listbycat/{userSeq}/{category}")
    @ApiOperation(value = "카테고리별 조회", notes = "특정 카테고리의 수집 현황을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getBookListByCategory(@PathVariable Long userSeq, @PathVariable String category){
        System.out.println(category);

        List<UserbookCollection> res = bookService.getListByCategory(userSeq, category);

        if(res.size() > 0){
            return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "카테고리별 리스트 조회 성공", res));
        } else{
            return ResponseEntity.status(409).body(BookGetBookListRes.of(409, "수집한 랜드마크 없음"));
        }
    }

    @GetMapping("/{userSeq}/{bookSeq}")
    @ApiOperation(value = "개별 랜드마크 조회", notes = "특정 랜드마크의 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getBookStatus(@PathVariable Long userSeq, @PathVariable Long bookSeq){
        UserbookCollection res = bookService.getBookStatus(userSeq, bookSeq);

        if(res == null){
            return ResponseEntity.status(409).body(BookGetBookRes.of(409, "수집하지 못한 랜드마크"));
        } else {
            return ResponseEntity.status(200).body(BookGetBookRes.of(200, "랜드마크 조회 성공", res));
        }
    }

    @PatchMapping("/update")
    @ApiOperation(value = "랜드마크 이미지 수정", notes = "특정 랜드마크의 정보를 갱신한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateBookStatus(@RequestBody BookUpdateStatusReq req){

        Long userSeq = req.getUserSeq();
        Long bookSeq = req.getBookSeq();

        UserbookCollection temp = bookService.getBookStatus(userSeq, bookSeq);

        if(temp == null){
            // 아직 수집하지 못한 경우 > 등록 갱신 실패
            return ResponseEntity.status(409).body(BookGetBookRes.of(409, "수집하지 못한 랜드마크"));
        } else {
            bookService.updateBookStatus(req);
            UserbookCollection res = bookService.getBookStatus(userSeq, bookSeq);
            return ResponseEntity.status(200).body(BookGetBookRes.of(200, "랜드마크 갱신 성공", res));
        }

    }


    // groupby 어떻게 작성하지,,,
//    @GetMapping("/countofgu/{userSeq}")
//    @ApiOperation(value = "구별 Count 조회", notes = "특정 구의 수집 개수를 조회한다.")
//    @ApiResponses({
//            @ApiResponse(code = 201, message = "성공"),
//            @ApiResponse(code = 400, message = "실패"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<? extends BaseResponseBody> getCountOfGugun(@PathVariable Long userSeq){
//        return null;
//    }
//
//    @GetMapping("/countofcat/{userSeq}")
//    @ApiOperation(value = "카테고리별 Count 조회", notes = "특정 카테고리의 수집 개수를 조회한다.")
//    @ApiResponses({
//            @ApiResponse(code = 201, message = "성공"),
//            @ApiResponse(code = 400, message = "실패"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<? extends BaseResponseBody> getCountOfCategory(@PathVariable Long userSeq){
//        return null;
//    }

    @GetMapping("/{userSeq}")
    @ApiOperation(value = "전체 수집 조회", notes = "사용자가 수집한 랜드마크 전체 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAllBookStatus(@PathVariable Long userSeq){
        List<UserbookCollection> res = bookService.getAllBookStatus(userSeq);

        if(res.size() > 0){
            return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "전체 리스트 조회 성공", res));
        } else{
            return ResponseEntity.status(409).body(BookGetBookListRes.of(409, "수집한 랜드마크 없음"));
        }

    }
}
