package com.ssafy.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.db.entity.UserbookCollection;
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
    private final String BASE_URL = "https://stamperimage.s3.ap-northeast-2.amazonaws.com";
    private final String USER_IMAGE_URL = "/userimg";

    @Autowired
    BookService bookService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    @Override
    public String uploadFileOnlyOne(MultipartFile multipartFile, Long userSeq, Long bookSeq) {

        // 업로드 하기 전에 이미 존재하는지 확인 --> 존재하는 경우 삭제
        UserbookCollection userbook = bookService.getBookStatus(userSeq, bookSeq);
        if (userbook != null){
            String existFile = userbook.getUserbookCollectionImage();
            if(existFile != null && existFile != ""){
                System.out.println("imgFile is already EXIST!! --> DELETE...");
                if(existFile.length() > 3){
                    try{
                        amazonS3.deleteObject(new DeleteObjectRequest(bucket, existFile));
                    } catch(Exception e) {
                        return ("delete fail");
                    }
                }
            }
        }

        String fileName = createFileName(multipartFile.getOriginalFilename());
        System.out.println("FILENAME : " + fileName);

        // fileName 변경 요망 --> userSeq + "_" +  bookSeq --> 보안문제 난수화
        // String newFileName = userSeq + "_" + bookSeq;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        String fullPath = "";

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket + USER_IMAGE_URL, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            fullPath = BASE_URL + USER_IMAGE_URL + "/" + fileName;

            if (!bookService.updateUserImgUrl(fullPath, userSeq, bookSeq)) {
                deleteFile(fullPath, (long) -1, (long) -1);
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

        System.out.println(fileName + " 업로드 성공 --> " + fullPath);
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
            System.out.println("-----check getFileExtension-----");
            System.out.println("fileName : " + fileName);
            System.out.println("substring idx : " + fileName.lastIndexOf("."));
            System.out.println("substring res : " + fileName.substring(0, fileName.lastIndexOf(".")));
            return fileName.substring(0, fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}
