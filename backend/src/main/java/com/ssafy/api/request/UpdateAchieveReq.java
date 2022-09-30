package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdateAchieveRequest")
public class UpdateAchieveReq {

    @ApiModelProperty(name = "userSeq")
    Long userSeq;

    @ApiModelProperty(name = "achieveName")
    String achieveName;


}
