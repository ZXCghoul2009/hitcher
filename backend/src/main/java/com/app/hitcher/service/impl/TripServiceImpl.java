package com.app.hitcher.service.impl;

import com.app.hitcher.domain.Trip;
import com.app.hitcher.domain.dto.TripDto;
import com.app.hitcher.domain.dto.TripRequest;
import com.app.hitcher.repository.TripRepository;
import com.app.hitcher.service.TripService;
import com.app.hitcher.specification.SearchCriteria;
import com.app.hitcher.specification.TripSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;

    public TripServiceImpl(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }


    @Override
    public List<Trip> findTripsFromSixToNoon(List<Trip> tripList) {

        return tripList.stream().filter(c -> c.getTime().getHour() > 6)
                .filter(c -> c.getTime().getHour() < 12).collect(Collectors.toList());
    }

    @Override
    public List<Trip> findTripsFromNoonToSix(List<Trip> tripList) {

        return tripList.stream().filter(c -> c.getTime().getHour() > 12)
                .filter(c -> c.getTime().getHour() < 18).collect(Collectors.toList());
    }

    @Override
    public List<Trip> findTripsAfterSixAm(List<Trip> tripList) {

        LocalTime of = LocalTime.of(6, 0);

        return tripList.stream().filter(c -> c.getTime().isAfter(of)).collect(Collectors.toList());
    }

    @Override
    public List<Trip> findTripsBeforeSixAm(List<Trip> tripList) {

        LocalTime of = LocalTime.of(6, 0);

        return tripList.stream().filter(c -> c.getTime().isBefore(of)).collect(Collectors.toList());
    }

    @Override
    public Trip createTrip(TripRequest tripRequest) {

        Trip trip = new Trip();

        trip.setDeparture(tripRequest.getDeparture());
        trip.setArrival(tripRequest.getArrival());
        trip.setSeats(tripRequest.getSeats());
        trip.setDay(tripRequest.getDay());
        trip.setTime(tripRequest.getTime());
        trip.setPrice(tripRequest.getPrice());
        trip.setDescription(tripRequest.getDescription());

        return tripRepository.save(trip);

    }

    public List<Trip> findAllBySpec(TripDto tripDto) {

        Trip trip = new Trip();
        LocalDate date = LocalDate.parse(tripDto.getDay(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        trip.setSeats(tripDto.getSeats());
        trip.setDeparture(tripDto.getDeparture());
        trip.setArrival(tripDto.getArrival());
        trip.setDay(date);

        TripSpecification seatsSpec = new TripSpecification(new SearchCriteria("seats", ":", trip.getSeats()));
        TripSpecification departureSpec = new TripSpecification(new SearchCriteria("departure", ":", trip.getDeparture()));
        TripSpecification arrivalSpec = new TripSpecification(new SearchCriteria("arrival", ":", trip.getArrival()));
        TripSpecification daySpec = new TripSpecification(new SearchCriteria("day", ":", trip.getDay()));

        return tripRepository.findAll(Specification.where(seatsSpec).and(departureSpec).and(arrivalSpec).and(daySpec));
    }
}
