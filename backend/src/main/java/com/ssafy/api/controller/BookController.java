package com.ssafy.api.controller;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.UserFindUserIdPostReq;
import com.ssafy.api.response.UserFindUserIdRes;
import com.ssafy.api.service.BookService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

//        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "실패"));
    }
}
