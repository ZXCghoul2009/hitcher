package com.app.hitcher.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class TripRequest {

    private String departure;

    private String arrival;

    private String seats;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate day;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime time;

    private Integer price;

    private String description;

}
