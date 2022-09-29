package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUpdateStatusReq
{
    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name = "Book Seq")
    Long bookSeq;

    @ApiModelProperty(name="Image URL")
    String imageURL;
}
