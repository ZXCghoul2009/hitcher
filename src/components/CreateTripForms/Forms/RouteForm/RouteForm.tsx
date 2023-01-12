import React from 'react';

import styles from './RouteForm.module.css'
import {DropDown} from "../../../Dropdown/DropDown";

type RouteData = {
  departure: string,
  arrival:string
}

type RouteFormProps = RouteData & {
  updateFields: (fields: Partial<RouteData>) => void
}

export const RouteForm: React.FC<RouteFormProps> = ({departure, arrival, updateFields}) => {

  const cityDepartureClickHandler = (event: any) => {
    updateFields({departure: event.target.textContent})
  }

  const cityArrivalClickHandler = (event: any) => {
    updateFields({arrival: event.target.textContent})
  }
  return (
      <div className={styles.container}>
        <div className={styles.input_container} >
          <input className={styles.input}
                 autoFocus
                 type="text"
                 value={departure}
                 placeholder='Откуда'
                 onChange={(event:any)=>updateFields({departure: event.target.value})}
          />
          <div className={styles.checkpoint}/>
          <DropDown value={departure} cityClickHandler={cityDepartureClickHandler}/>
        </div>
        <div className={styles.input_container}>
          <input className={styles.input}
                 value={arrival}
                 type="text"
                 placeholder='Куда'
                 onChange={(event:any)=>updateFields({arrival: event.target.value})}
          />
          <div className={styles.checkpoint}/>
          <DropDown value={arrival} cityClickHandler={cityArrivalClickHandler}/>
        </div>
      </div>
  );
};
