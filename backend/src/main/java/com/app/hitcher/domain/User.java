package com.app.hitcher.domain;

import com.app.hitcher.domain.enums.Sex;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "nUser")
@Getter
@Setter
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "sex")
    @Enumerated
    private Sex sex;

    @Column(name = "dateOfBirth")
    private Date dateOfBirth;

    @Column(name = "password")
    private String password;

    @Column(name = "numberTrips")
    private Integer numberTrips;

    @Column(name = "registrationDate")
    private Date registrationDate;

    @Column(name = "about")
    private String about;

    public User(String name,
                String surname,
                String email,
                String phoneNumber,
                Sex sex,
                Date dateOfBirth,
                String password,
                Integer numberTrips,
                Date registrationDate,
                String about) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.numberTrips = numberTrips;
        this.registrationDate = registrationDate;
        this.about = about;
    }

    public User() {

    }
}
