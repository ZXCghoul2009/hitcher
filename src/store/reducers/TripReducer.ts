
export enum TripActions {
  FETCH_TRIP = "FIND_TRIP",
  FETCH_TRIP_SUCCESS = "FIND_TRIP_SUCCESS",
  FETCH_TRIP_ERROR = "FIND_TRIP_ERROR",
}

interface FetchTripAction {
  type: TripActions.FETCH_TRIP
}
interface FetchTripSuccessAction {
  type: TripActions.FETCH_TRIP_SUCCESS,
  payload: any[]
}
interface FetchTripErrorAction {
  type: TripActions.FETCH_TRIP_ERROR
  payload: string
}

interface TripState {
  trips: any[];
  loading: boolean;
  error: null | string;
}

export type TripActionType = FetchTripAction | FetchTripSuccessAction | FetchTripErrorAction
const initialState: TripState = {
  trips : [],
  loading: false,
  error: null
}


export const TripReducer = (state = initialState, action:TripActionType):TripState => {
  switch (action.type) {
    case TripActions.FETCH_TRIP:
      return {loading: true, error: null, trips:[]}
    case TripActions.FETCH_TRIP_SUCCESS:
      return {loading: false, error: null, trips: action.payload}
    case TripActions.FETCH_TRIP_ERROR:
      return {loading: false, error: action.payload, trips:[]}
    default:
      return state
  }
}