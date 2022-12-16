import {combineReducers} from "redux";
import {TripReducer} from "./TripReducer";


export const rootReducer = combineReducers({
   trip: TripReducer
})

export type RootState = ReturnType<typeof rootReducer>