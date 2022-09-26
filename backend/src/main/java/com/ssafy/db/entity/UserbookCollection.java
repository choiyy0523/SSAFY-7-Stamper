package com.ssafy.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_userbookCollection")
public class UserbookCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userbookCollectionSeq = null;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_seq")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "userbookCollection_date")
    private String userbookCollectionDate;

    @Column(name = "userbookCollection_image")
    private String userbookCollectionImage;
}
