import {combineReducers} from "redux";
import {TripReducer} from "./TripReducer";
import {
   passwordUpdateReducer,
   profileUpdateReducer, userDeleteReducer, userDetailsReducer,
   userLoginReducer,
   userRegisterReducer,
   usersFetchReducer, userUpdateReducer
} from "./UserReducer";


export const rootReducer = combineReducers({
   trip: TripReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   profileUpdate: profileUpdateReducer,
   passwordUpdate: passwordUpdateReducer,
   usersFetch: usersFetchReducer,
   userDetails: userDetailsReducer,
   userUpdate: userUpdateReducer,
   userDelete: userDeleteReducer,
})

export type RootState = ReturnType<typeof rootReducer>