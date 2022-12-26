import {TripActions, TripActionType} from "../reducers/TripReducer";
import {Dispatch} from "redux";
import axios from "axios";


export const fetchTrip = (url = '', params: {
  arrival: string;
  day: string;
  seats: string;
  departure: string;
   }) => {
  return async (dispatch: Dispatch<TripActionType>) => {
    try {
      dispatch({type: TripActions.FETCH_TRIP})
      const response = await axios.get(url, {
        params : {
          arrival: params.arrival,
          seats: params.seats,
          day: params.day ,
          departure: params.departure
        }
      })
      dispatch({type: TripActions.FETCH_TRIP_SUCCESS, payload: response.data})
    } catch (e) {
      dispatch({type: TripActions.FETCH_TRIP_ERROR, payload: "Произошла ошибка при загрузке поездок"})
    }
  }
}