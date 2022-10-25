package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "recall")
@Getter
@Setter
@EqualsAndHashCode
public class Recall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //todo make a constraint(5)
    @Column(name = "stars")
    private Integer stars;

    @Column(name = "comment")
    private String comment;

    //todo
    @ManyToMany
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private List<User> users;

    public Recall(Integer stars, String comment, List<User> users) {
        this.stars = stars;
        this.comment = comment;
        this.users = users;
    }

    public Recall() {

    }
}
