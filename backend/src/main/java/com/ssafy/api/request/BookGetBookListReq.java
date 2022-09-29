package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookGetBookListReq {

    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name = "Book Seq")
    Long bookSeq;

    @ApiModelProperty(name="Gugun")
    String gugun;

    @ApiModelProperty(name="Category")
    String category;
}
