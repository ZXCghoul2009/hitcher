package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "photo")
@Getter
@Setter
@EqualsAndHashCode
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path")
    private String path;

    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public Photo(String path, User user) {
        this.path = path;
        this.user = user;
    }

    public Photo() {

    }
}
