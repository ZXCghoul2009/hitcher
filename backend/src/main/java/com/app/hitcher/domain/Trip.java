package com.app.hitcher.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "trip")
@Getter
@Setter
@EqualsAndHashCode
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seats")
    private String seats;

    @Column(name = "departure")
    private String departure;

    @Column(name = "arrival")
    private String arrival;

    @Column(name = "day")
    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private LocalDate day;

    @Column(name = "time")
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime time;

    @Column(name = "price")
    private Integer price;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Trip(String seats,
                String departure,
                String arrival,
                LocalDate day,
                Integer price,
                String description,
                User user) {
        this.seats = seats;
        this.departure = departure;
        this.arrival = arrival;
        this.day = day;
        this.price = price;
        this.description = description;
        this.user = user;
    }

    public Trip() {

    }

    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", seats='" + seats + '\'' +
                ", departure='" + departure + '\'' +
                ", arrival='" + arrival + '\'' +
                ", day=" + day +
                ", time=" + time +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", user=" + user +
                '}';
    }
}
