package com.app.hitcher.service;

import com.app.hitcher.domain.Trip;
import com.app.hitcher.domain.dto.TripDto;
import com.app.hitcher.domain.dto.TripRequest;

import java.util.List;

public interface TripService {

    public List<Trip> findTripsFromSixToNoon(List<Trip> tripList);

    public List<Trip> findTripsFromNoonToSix(List<Trip> tripList);

    public List<Trip> findTripsAfterSixAm(List<Trip> tripList);

    public List<Trip> findTripsBeforeSixAm(List<Trip> tripList);

    public Trip createTrip(TripRequest tripRequest);

    public List<Trip> findAllBySpec(TripDto tripDto);

}
