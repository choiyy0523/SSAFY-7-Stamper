package com.ssafy.db.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Getter
@Table(name = "tb_achievement")
public class Achieve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achieveSeq = null;

    @Column(name = "achieve_category")
    private String achieveCategory;

    @Column(name = "achieve_subcategory")
    private String achieveSubcategory;

    @Column(name = "achieve_name")
    private String achieveName;

    @Column(name = "achieve_desc")
    private String achieveDesc;


}
