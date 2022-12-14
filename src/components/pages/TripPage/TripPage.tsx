import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Trip} from "../../../utils/types/types";
import {useParams} from "react-router-dom";

import styles from './TripPage.module.css'

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

          <h1>{trip?.day.replace(/-/g,'.').slice(5)}</h1>
          {trip?.departure}
        </div>
      </div>
  );
};

