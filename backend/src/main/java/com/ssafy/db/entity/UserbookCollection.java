package com.ssafy.db.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@Data
@Entity
@DynamicUpdate
@Table(name = "tb_userbook_collection")
public class UserbookCollection implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userbookCollectionSeq = null;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_seq")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "userbook_collection_date")
    private String userbookCollectionDate;

    @Column(name = "userbook_collection_image")
    private String userbookCollectionImage;

    @Column(name = "userbook_collection_gugun")
    private String userbookCollectionGugun;

    @Column(name = "userbook_collection_category")
    private String userbookCollectionCategory;

    @Builder
    public UserbookCollection(Book book, User user, String userbookCollectionDate, String userbookCollectionImage, String userbookCollectionGugun, String userbookCollectionCategory ){
        this.book = book;
        this.user = user;
        this.userbookCollectionDate = userbookCollectionDate;
        this.userbookCollectionImage = userbookCollectionImage;
        this.userbookCollectionGugun = userbookCollectionGugun;
        this.userbookCollectionCategory = userbookCollectionCategory;
    }
}
