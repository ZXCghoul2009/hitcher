package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "car")
@Getter
@Setter
@EqualsAndHashCode
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "carBrand")
    private String carBrand;

    @Column(name = "color")
    private String color;

    @Column(name = "carNumbers")
    private String carNumbers;

    @Column(name = "numberOfSeats")
    private Integer numberOfSeats;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public Car(String carBrand, String color, String carNumbers, Integer numberOfSeats, User user) {
        this.carBrand = carBrand;
        this.color = color;
        this.carNumbers = carNumbers;
        this.numberOfSeats = numberOfSeats;
        this.user = user;
    }

    public Car() {

    }
}
