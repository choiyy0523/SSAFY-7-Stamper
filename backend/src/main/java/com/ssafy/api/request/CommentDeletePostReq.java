package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CommentDeletePostReq")
public class CommentDeletePostReq {

    @ApiModelProperty(name = "User Seq")
    Long userSeq;

    @ApiModelProperty(name="Comment Seq")
    Long commentSeq;
}
