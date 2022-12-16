import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as TripActionCreators from '../../store/action-creator/trip'


export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(TripActionCreators, dispatch)
}