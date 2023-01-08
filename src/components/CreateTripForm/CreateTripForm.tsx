import React, {useState} from 'react';
import {Input} from "../../UI/Input/Input";
import {DateInput} from "../../UI/fields";
import {SwitchToggle} from "../../UI/SwtichToggle/SwitchToggle";

import styles from './CreateTripForm.module.css'
import {DropDown} from "../Dropdown/DropDown";

interface InitialStateInterface {
  description: string;
  departure: string,
  arrival: string,
  seats: string,
  date: Date,
  price: string,
  time: any,
  withAnimal: boolean;
}


export const CreateTripForm: React.FC = () => {
  const [tripFormValues, setTripFormValues] =useState({ description: '',
    departure: '',
    arrival: '',
    seats: '1',
    date: Date,
    price: '1',
    time: '10:00',
    withAnimal: false})
  const [withAnimal, setWithAnimal] = useState(false)
  const [date, setDate]=useState(new Date())

  const cityDepartureClickHandler = (event: any) => {
    setTripFormValues({...tripFormValues, departure: event.target.textContent})
  }

  const cityArrivalClickHandler = (event: any) => {
    setTripFormValues({...tripFormValues, arrival: event.target.textContent})
  }

  return (
      <form className={styles.form}>
        <div className={styles.item}>
          <label htmlFor="">Описание поездки</label>
          <Input type="text"/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Откуда</label>
          <Input type="text" value={tripFormValues.departure} onChange={(event:any)=>setTripFormValues({...tripFormValues, departure: event.target.value})}/>
          <DropDown value={tripFormValues.departure} cityClickHandler={cityDepartureClickHandler}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Куда</label>
          <Input type="text" value={tripFormValues.arrival} onChange={(event:any)=>setTripFormValues({...tripFormValues, arrival: event.target.value})}/>
          <DropDown value={tripFormValues.arrival} cityClickHandler={cityArrivalClickHandler}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Количество мест</label>
          <Input type="number" min={1}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Дата</label>
          <DateInput value={date} onChange={setDate} label={''}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Цена поездки</label>
          <Input type="number" min={1}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Время</label>
          <Input type="time" value={'03:30'}/>
        </div>
        <div className={styles.item}>
          <label htmlFor="">Можно ли с животными?</label>
          <SwitchToggle isOn={withAnimal} handleToggle={()=>setWithAnimal(!withAnimal)} onColor="#7588ff"/>
        </div>
      </form>
  );
};

