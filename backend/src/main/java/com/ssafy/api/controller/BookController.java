package com.ssafy.api.controller;

import com.ssafy.api.request.BookGetBookListReq;
import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.BookUpdateStatusReq;

import com.ssafy.api.service.BookService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Book;

import com.ssafy.api.response.*;
import com.ssafy.db.entity.Comment;

import com.ssafy.db.entity.UserbookCollection;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value = "랜드마크 등록", required = true) BookRegisterPostReq bookInfo
    ) {
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        Long userSeq = bookInfo.getUserSeq();
        Long bookSeq = bookInfo.getBookSeq();
        String imageURL = bookInfo.getUserbookCollectionImage();

        UserbookCollection temp = bookService.getBookStatus(userSeq, bookSeq);

        if(temp != null){
                BookUpdateStatusReq tempReq = new BookUpdateStatusReq();
                tempReq.setUserSeq(userSeq);
                tempReq.setBookSeq(bookSeq);
                tempReq.setImageURL(imageURL);
                bookService.updateBookStatus(tempReq);
        } else {
                bookService.registerUserbookCollection(bookInfo);
        }

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));

        // bookService.registerUserbookCollection(bookInfo);
        // return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
    }


    @GetMapping(value = "/listbygu/{userSeq}/{gugun}")
    @ApiOperation(value = "구별 조회", notes = "특정 구의 수집 현황을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getListByGugun(@ApiIgnore Authentication authentication, @PathVariable Long userSeq, @PathVariable String gugun){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        // 수집한 리스트
        List<UserbookCollection> res = bookService.getListByGugun(userSeq, gugun);

        // 전체 리스트
        List<Book> totalList = bookService.getBookInfoByGugun(gugun);

        return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "구별 리스트 조회 성공", res, totalList));
    }

    @GetMapping(value = "/listbycat/{userSeq}/{category}")
    @ApiOperation(value = "카테고리별 조회", notes = "특정 카테고리의 수집 현황을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getBookListByCategory(@ApiIgnore Authentication authentication, @PathVariable Long userSeq, @PathVariable String category){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        // 수집한 리스트
        List<UserbookCollection> res = bookService.getListByCategory(userSeq, category);

        // 전체 리스트
        List<Book> totalList = bookService.getBookInfoByCategory(category);

        return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "카테고리별 리스트 조회 성공", res, totalList));
    }

    @GetMapping("/{userSeq}/{bookSeq}")
    @ApiOperation(value = "개별 랜드마크 조회", notes = "특정 랜드마크의 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getBookStatus(@ApiIgnore Authentication authentication, @PathVariable Long userSeq, @PathVariable Long bookSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        UserbookCollection res = bookService.getBookStatus(userSeq, bookSeq);

        Book book = bookService.getBookInfo(bookSeq);

        return ResponseEntity.status(200).body(BookGetBookRes.of(200, "랜드마크 조회 성공", res, book));

    }

    @PatchMapping("/update")
    @ApiOperation(value = "랜드마크 이미지 수정", notes = "특정 랜드마크의 정보를 갱신한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateBookStatus(@ApiIgnore Authentication authentication, @RequestBody BookUpdateStatusReq req){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        Long userSeq = req.getUserSeq();
        Long bookSeq = req.getBookSeq();

        UserbookCollection temp = bookService.getBookStatus(userSeq, bookSeq);

        if(temp == null){
            // 아직 수집하지 못한 경우 > 등록 갱신 실패
            return ResponseEntity.status(409).body(BookGetBookRes.of(409, "수집하지 못한 랜드마크"));
        } else {
            bookService.updateBookStatus(req);
            UserbookCollection res = bookService.getBookStatus(userSeq, bookSeq);
            return ResponseEntity.status(200).body(BookGetBookRes.of(200, "랜드마크 갱신 성공", res, null));
        }

    }


    // groupby 어떻게 작성하지,,,
    @GetMapping("/countofgu/{userSeq}")
    @ApiOperation(value = "구별 Count 조회", notes = "특정 구의 수집 개수를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getCountOfGugun(@ApiIgnore Authentication authentication, @PathVariable Long userSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        List<GugunClass> list = bookService.getbookCountofGugun(userSeq);
        return ResponseEntity.status(200).body(CountofGugunRes.of(200, "성공", list));
    }

    @GetMapping("/countofcat/{userSeq}")
    @ApiOperation(value = "카테고리별 Count 조회", notes = "특정 카테고리의 수집 개수를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getCountOfCategory(@ApiIgnore Authentication authentication, @PathVariable Long userSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        List<CatClass> list = bookService.getbookCountofCat(userSeq);
        return ResponseEntity.status(200).body(CountofCatRes.of(200, "성공", list));
    }

    @GetMapping("/{userSeq}")
    @ApiOperation(value = "전체 수집 조회", notes = "사용자가 수집한 랜드마크 전체 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getAllBookStatus(@ApiIgnore Authentication authentication, @PathVariable Long userSeq){
        if (authentication == null){
//            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Unauthenticated"));
        }

        List<UserbookCollection> res = bookService.getAllBookStatus(userSeq);

        List<Book> book = bookService.getAllBookInfo();

        return ResponseEntity.status(200).body(BookGetBookListRes.of(200, "전체 리스트 조회 성공", res, book));

    }
}
