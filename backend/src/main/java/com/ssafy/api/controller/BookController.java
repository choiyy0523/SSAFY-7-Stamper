package com.ssafy.api.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 도감(Book) 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "도감(Book) API", tags = {"Book"})
@RestController
@RequestMapping("/api/book")
public class BookController {

}
