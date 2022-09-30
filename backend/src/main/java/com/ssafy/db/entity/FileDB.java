package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Data
@Table(name = "tb_file")
public class FileDB {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2") // AutoIncrement 대신 128bit짜리 Seq
    private String id;
    private String name;
    private String type;

    @Lob // varchar(255)보다 큰 걸 저장할 때 사용(ex.byte[])
    private byte[] data;

    public FileDB(String name, String type, byte[] data){
        this.name = name;
        this.type = type;
        this.data = data;
    }


}
