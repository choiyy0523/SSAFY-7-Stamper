package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentRegisterPostReq")
public class CommentRegisterPostReq {

    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name="Book Seq")
    Long bookSeq;

    @ApiModelProperty(name="Comment Content")
    String commentContent;

}
