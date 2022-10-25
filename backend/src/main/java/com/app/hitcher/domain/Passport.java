package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "passport")
@Getter
@Setter
@EqualsAndHashCode
public class Passport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "passportNumber")
    private String passportNumber;

    @Column(name = "identificationNumber")
    private String identificationNumber;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "dateOfIssue")
    private Date dateOfIssue;

    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public Passport(String passportNumber,
                    String identificationNumber,
                    String name,
                    String surname,
                    Date dateOfIssue,
                    User user) {
        this.passportNumber = passportNumber;
        this.identificationNumber = identificationNumber;
        this.name = name;
        this.surname = surname;
        this.dateOfIssue = dateOfIssue;
        this.user = user;
    }

    public Passport() {

    }
}
