package com.ssafy.api.controller;

import com.ssafy.api.request.BookRegisterPostReq;
import com.ssafy.api.request.CommentDeletePostReq;
import com.ssafy.api.request.CommentRegisterPostReq;
import com.ssafy.api.request.CommentUpdatePostReq;
import com.ssafy.api.response.CommentRes;
import com.ssafy.api.response.UserDuplCheckRes;
import com.ssafy.api.service.BookService;
import com.ssafy.api.service.CommentService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 댓글(Comment) 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "댓글(Comment) API", tags = {"Comment"})
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/register")
    @ApiOperation(value = "댓글", notes = "댓글을 등록한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> commentRegister(
            @RequestBody @ApiParam(value = "댓글 등록", required = true) CommentRegisterPostReq commentInfo
    ) {
        commentService.registerComment(commentInfo);
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));

//        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "실패"));
    }

    @GetMapping("/{book_seq}")
    @ApiOperation(value = "댓글 조회", notes = "해당 랜드마크의 댓글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> CommentList(@PathVariable(required = false) Long book_seq) {

        System.out.println("=================================================="+book_seq);
        List<Comment> list = commentService.getCommentByBookSeq(book_seq);
        return ResponseEntity.status(200).body(CommentRes.of(200, "성공", list));
    }

    @PatchMapping("/update")
    @ApiOperation(value = "댓글 수정", notes = "댓글을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> commentUpdate(
            @RequestBody @ApiParam(value = "댓글 수정", required = true) CommentUpdatePostReq commentInfo
    ) {
        commentService.updateComment(commentInfo);
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));

//        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "실패"));
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 400, message = "실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> commentDelete(
            @RequestBody @ApiParam(value = "댓글 수정", required = true) CommentDeletePostReq commentInfo
    ) {
        commentService.deleteComment(commentInfo);
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));

//        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "실패"));
    }
}
