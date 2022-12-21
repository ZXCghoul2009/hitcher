import {TripActions, TripActionType} from "../reducers/TripReducer";
import {Dispatch} from "redux";
import axios from "axios";


export const fetchTrip = (arrival = '', seats = '1',day ='', departure ='') => {
  return async (dispatch: Dispatch<TripActionType>) => {
    try {
      dispatch({type: TripActions.FETCH_TRIP})
      const response = await axios.get('http://localhost:8081/get', {
        params : {
          arrival: arrival,
          seats: seats,
          day: day ,
          departure: departure
        }
      })
      dispatch({type: TripActions.FETCH_TRIP_SUCCESS, payload: response.data})
    } catch (e) {
      dispatch({type: TripActions.FETCH_TRIP_ERROR, payload: "Произошла ошибка при загрузке поездок"})
    }
  }
}