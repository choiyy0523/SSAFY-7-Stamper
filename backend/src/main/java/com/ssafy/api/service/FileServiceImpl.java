package com.ssafy.api.service;


import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String userImgUpload(MultipartFile multipartFile) {
        // https://umanking.github.io/2020/01/02/spring-fileupload/ 참고

        // uploadDir 절대경로를 명시해줘야 하나??
        String uploadDir = "/home/ubuntu/userImg";

        Path copyOfLocation = Paths.get(uploadDir + File.separator + StringUtils.cleanPath(multipartFile.getOriginalFilename()));

        try {
            Files.copy(multipartFile.getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
            return "SUCCESS";
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Could not store file : " + multipartFile.getOriginalFilename());
            return "FAIL";
        }
    }

    @Override
    public String profileImgUpload(MultipartFile multipartFile) {
        return null;
    }
}
