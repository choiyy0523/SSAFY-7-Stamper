package com.ssafy.api.service;

import com.ssafy.db.entity.FileDB;
import com.ssafy.db.repository.FileDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FileDBServiceImpl implements FileDBService{
    @Autowired
    private FileDBRepository fileDBRepository;
    public FileDB store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
        return fileDBRepository.save(FileDB);
    }
    public FileDB getFile(String id) {
        Optional<FileDB> f = fileDBRepository.findById(id);
        if (f.isPresent())
            return f.get();
        else
            return null;
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }

    public void delete(String id){
        FileDB fileDB = fileDBRepository.findById(id).get();
        fileDBRepository.delete(fileDB);
    }
}
