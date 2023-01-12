import React, {useEffect, useState} from 'react';
import {useMultistepForm} from "../../utils/hooks/useMultistepForm";
import {RouteForm} from "./Forms/RouteForm/RouteForm";
import SeatsForm from "./Forms/SeatsForm/SeatsForm";
import {DateAndTimeForm} from "./Forms/Date&TimeForm/Date&TimeForm";
import dayjs from "dayjs";
import {OptionsForm} from "./Forms/OptionsForm/OptionsForm";

import styles from './CreateTripForm.module.css'

interface InitialStateInterface {
  description: string;
  departure: string,
  arrival: string,
  seats: number,
  date: string,
  price: string,
  time: any,
  withAnimals: boolean
  threeBack: boolean,
  canSmoke: boolean
}

const InitialState: InitialStateInterface = {
  description: "",
  departure: "",
  arrival: "",
  seats: 1,
  date: '',
  price: "",
  time: dayjs(),
  withAnimals: false,
  threeBack: false,
  canSmoke: false,
}

export const CreateTripForm: React.FC = () => {
  const [data, setData] = useState(InitialState)

  const updateFields = (fields: Partial<InitialStateInterface>) => {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, setCurrentStepIndex} = useMultistepForm([
      <RouteForm departure={data.departure} arrival={data.arrival} updateFields={updateFields}/>,
      <SeatsForm seats={data.seats} updateFields={updateFields}/>,
      <DateAndTimeForm date={data.date} time={data.time} updateFields={updateFields}/>,
      <OptionsForm withAnimals={data.withAnimals} threeBack={data.threeBack} canSmoke={data.canSmoke} updateFields={updateFields}/>
  ]);

  const [errors, setErrors] = useState<boolean | string>(false)

  const validateForm = (data:InitialStateInterface) => {
    if (data.arrival.length === 0 || data.departure.length === 0 || data.date.length === 0) {
      setErrors('Заполните поля')
    } else {
      setErrors(false)
    }
  }
  useEffect(()=>{
    validateForm(data)
  }, [data.arrival, data.departure, data.date])
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
  }
  console.log(!errors)
  return (
      <div className={styles.forms_container}>
        <div className={styles.container}>
          <div onClick={()=>setCurrentStepIndex(0)} className={styles.routes}>
            <div className={styles.route}>
              <div className={styles.checkpoint}/>
              {!isFirstStep ? data.departure : 'Откуда'}
            </div>
            <div className={styles.route}>
              <div className={styles.checkpoint}/>
              { !isFirstStep ? data.arrival : 'Куда' }
            </div>
          </div>
          <div className={styles.seats} onClick={()=>setCurrentStepIndex(1)}>
            <div className={styles.people}/>
            {data.seats}
          </div>
          <button type="submit" className={styles.create_trip_btn} disabled={!isLastStep} >Опубликовать поездку</button>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.count_of_steps}>
            {errors}
            {currentStepIndex + 1} / {steps.length}
          </div>

          {step}
          <div className={styles.buttons}>
            {!isFirstStep && (
                <button className={styles.back_button} type="button" onClick={back}>
                  Назад
                </button>
            )}
            {!isLastStep && <button type="submit" >Далее</button>}
          </div>
        </form>
      </div>
  );
};

