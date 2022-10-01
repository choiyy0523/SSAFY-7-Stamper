package com.ssafy.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    public String userImgUpload(MultipartFile multipartFile);

    public String profileImgUpload(MultipartFile multipartFile);

}
