package com.app.hitcher.controller;

import com.app.hitcher.domain.Trip;
import com.app.hitcher.domain.dto.TripDto;
import com.app.hitcher.domain.dto.TripRequest;
import com.app.hitcher.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController("/api/v1/trip")
public class TripController {


    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @CrossOrigin(origins = "http://localhost:8081")
    @GetMapping("/get")
    public List<Trip> getAllBySpec(TripDto tripDto, @RequestParam(value = "afterSix", required = false) boolean afterSix,
                                   @RequestParam(value = "beforeSix", required = false) boolean beforeSix,
                                   @RequestParam(value = "betweenSN", required = false) boolean betweenSN,
                                   @RequestParam(value = "betweenNS", required = false) boolean betweenNS) {

        List<Trip> trips = tripService.findAllBySpec(tripDto);

        if (afterSix) {
            return tripService.findTripsAfterSixAm(trips);
        } else if (beforeSix)
            return tripService.findTripsBeforeSixAm(trips);
        else if (betweenSN)
            return tripService.findTripsFromSixToNoon(trips);
        else if (betweenNS)
            return tripService.findTripsFromNoonToSix(trips);
        else
            return trips;
    }

    @PostMapping("/create")
    public Trip createTrip(@RequestBody TripRequest tripRequest) {
        return tripService.createTrip(tripRequest);
    }
}
