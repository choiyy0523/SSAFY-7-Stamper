package com.ssafy.Stamper.db.entity;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_book")
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookSeq = null;

    @Column(name = "book_maincategory")
    private String bookMaincategory;

    @Column(name = "book_subcategory")
    private String bookSubcategory;

    @Column(name = "book_gugun")
    private String bookGugun;

    @Column(name = "book_name")
    private String bookName;

    @Column(name = "book_latitude")
    private String bookLatitude;

    @Column(name = "book_longitude")
    private String bookLongitude;

    @Column(name = "book_imageURL")
    private String bookImageURL;

    @Column(name = "book_description")
    private String bookDescription;
}
