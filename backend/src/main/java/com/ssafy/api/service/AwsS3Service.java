package com.ssafy.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
    String uploadFileOnlyOne(MultipartFile multipartFile, Long userSeq, Long bookSeq);

    void deleteFile(String url, Long userSeq, Long bookSeq);

}
