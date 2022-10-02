package com.ssafy.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

// presented by A205 ParkSeHyun

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {
    private final String BASE_URL = "https://initpjtbucket.s3.ap-northeast-2.amazonaws.com";
    private final String USER_IMAGE_URL = "/userimg";

    @Autowired
    BookService bookService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    @Override
    public String uploadFileOnlyOne(MultipartFile multipartFile, Long userSeq, Long bookSeq) {
        String fileName = createFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket + USER_IMAGE_URL, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            fileName = BASE_URL + USER_IMAGE_URL + "/"  + fileName;

            if (!bookService.updateUserImgUrl(fileName, userSeq, bookSeq)) {
                deleteFile(fileName, (long) -1, (long) -1);
                return ("fail");
            }
//            else if (flag == 1){
//                amazonS3.putObject(new PutObjectRequest(bucket + PROFILE_IMAGE_URL, fileName, inputStream, objectMetadata)
//                        .withCannedAcl(CannedAccessControlList.PublicRead));
//                fileName = BASE_URL + PROFILE_IMAGE_URL + "/" + fileName;
//
//                if (!userService.updateUserImgUrl(fileName, userId)) {
//                    deleteFile(fileName, -1);
//                    return ("fail");
//                }
//            }
        } catch(IOException e) {
            System.out.println(">>> 파일 업로드 실패");
            return ("fail");
        }

        return (fileName);
    }

    @Override
    public void deleteFile(String url, Long userSeq, Long bookSeq) {
        String fileName = url.split(BASE_URL)[1].substring(1);
        System.out.println("fileName : "  + fileName);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));

        if (userSeq != -1) {
            bookService.updateUserImgUrl(null, userSeq, bookSeq);
        }
    }

    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}
