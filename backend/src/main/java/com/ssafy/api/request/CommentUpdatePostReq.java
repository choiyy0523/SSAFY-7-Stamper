package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentUpdatePostReq")
public class CommentUpdatePostReq {

    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name="Comment Seq")
    Long commentSeq;

    @ApiModelProperty(name="Comment Content")
    String commentContent;

}
