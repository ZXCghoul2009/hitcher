import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Trip} from "../../../utils/types/types";
import {useParams} from "react-router-dom";

import styles from './TripPage.module.css'
import moment from "moment";
import 'moment/locale/ru'

type TripParams = {
  id:string,
}

export const TripPage:React.FC = () => {
  const [trip, setTrip] = useState<Trip | null>(null)
  const params = useParams<TripParams>()
  useEffect(()=>{
    fetchTrip()
  },[])

  async function fetchTrip() {
    try {
      const response = await axios.get<Trip>('http://localhost:8081/get/' + params.id)
      setTrip(response.data)
    } catch (e) {
      
    }
  }



  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.date}>
            {moment().locale('ru') && moment(trip?.day).format('ddd')[0].toUpperCase() }{moment(trip?.day).format('ddd')[1]}, {moment(trip?.day).format('D MMMM')}
          </div>
          <div className={styles.information}>
            <div>
              {trip?.arrival}
            </div>
            <div>
              {trip?.departure}
            </div>
          </div>
          <div className={styles.price_info}>
            <div>
              Всего за 1 пассажира
            </div>
            <div className={styles.price}>
              {trip?.price} BYN
            </div>
          </div>
        </div>
      </div>
  );
};

