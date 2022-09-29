package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookRegisterPostReq {

    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name="Book Seq")
    Long bookSeq;

    @ApiModelProperty(name="UserbookCollection Image")
    String userbookCollectionImage;

    @ApiModelProperty(name="Gugun")
    String gugun;

    @ApiModelProperty(name="Category")
    String category;
}
