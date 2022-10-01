package com.ssafy.api.controller;

import com.ssafy.api.service.FileService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@Controller
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping
    @ApiOperation(value = "이미지 업로드", notes = "사용자가 촬영한 이미지를 서버에 업로드한다.")
    public ResponseEntity<? extends BaseResponseBody> uploadUserImage(@ApiIgnore Authentication authentication, @RequestBody MultipartFile multipartFile){

    }

    //post > requestbody Mulitipartfile

}
