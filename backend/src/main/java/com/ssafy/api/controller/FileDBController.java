package com.ssafy.api.controller;

import com.ssafy.api.response.FileRegisterPostRes;
import com.ssafy.api.response.GetFileRes;
import com.ssafy.api.service.FileDBServiceImpl;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.FileDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/api/file")
public class FileDBController {
    @Autowired
    private FileDBServiceImpl fileDBService;

    // @PostMapping()
    // public ResponseEntity<? extends BaseResponseBody> register(@RequestParam("file") MultipartFile file){
    //     String message = "";
    //     try {
    //         FileDB f = fileDBService.store(file);
    //         return ResponseEntity.status(200).body(FileRegisterPostRes.of(200, "success", f.getId()));
    //     } catch (Exception e) {
    //         message = "Could not upload the file: " + file.getOriginalFilename() + "!";
    //         return ResponseEntity.status(415).body(BaseResponseBody.of(415, message));
    //     }
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<? extends BaseResponseBody> getFile(@PathVariable String id) {
    //     FileDB fileDB = fileDBService.getFile(id);
    //     return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"").body(GetFileRes.of(200, "success", fileDB.getData()));
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<? extends BaseResponseBody> delete(@PathVariable String id){
        fileDBService.delete(id);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
