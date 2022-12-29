import React, {useEffect, useState} from 'react';
import classes from './SearchTripsForm.module.css';
import {Input} from "../../UI/Input/Input";
import {DropDown} from "../Dropdown/DropDown";
import {DateInput} from "../../UI/fields";
import {Button} from "../../UI/Buttons/Button";
import useLocalStorage from "use-local-storage";
import {options} from "../../utils/helpers/localstorage/localstorage";
import axios from "axios";
import {useNavigate} from "react-router-dom";


interface SearchTripsFormProps {
  setIsLoading: any,
  setTrips:any,
  setError: any,
  setFetchIsFinished: any,
}

export const SearchTripsForm: React.FC<SearchTripsFormProps> = ({setIsLoading,setTrips, setError, setFetchIsFinished }) => {
  const navigate = useNavigate()
  let date = new Date()

  const [departureValue, setDepartureValue] = useLocalStorage<string>("departure", '');
  const [arrivalValue, setArrivalValue] = useLocalStorage<string>("arrival", '');
  const [dateValue, setDateValue] = useLocalStorage<Date>('date', date, options)
  const [seatsValue, setSeatsValue] = useLocalStorage<string>("seats", '1')
  const [formIsValid, setFormIsValid] = useState<boolean>(false)

  const params = {
    arrival: arrivalValue.trim(),
    seats: seatsValue,
    day: dateValue.toLocaleDateString().split('.').reverse().join('-'),
    departure: departureValue.trim()
  }

 const fetchTrip = async (url: string, params: {
    arrival: string;
    day: string;
    seats: string;
    departure: string;
  }) => {
    try {
      setIsLoading(true)
      const response = await axios.get(url, {
        params: {
          arrival: params.arrival,
          seats: params.seats,
          day: params.day,
          departure: params.departure
        }, headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
      setTrips(response.data)
      setIsLoading(false)
      navigate('/')
    } catch (e) {
      setError(`${e}`)
      setIsLoading(false)
    }
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsValid) {
      setFetchIsFinished(false)
      fetchTrip('http://localhost:8081/get', params).catch()
      setFetchIsFinished(true)
    }
  }


  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
          departureValue.length > 2 && arrivalValue.length > 2
      )
    }, 500)
    return () => {
      clearTimeout(identifier);
    }
  }, [departureValue, arrivalValue])

  const switchHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    setDepartureValue(arrivalValue);
    setArrivalValue(departureValue);
  }

  const cityDepartureClickHandler = (event: any) => {
    setDepartureValue(event.target.textContent)
  }

  const cityArrivalClickHandler = (event: any) => {
    setArrivalValue(event.target.textContent)
  }

  return (
      <form onSubmit={submitHandler}>
        <div className={classes.container}>
          <h1>Поездки на ваш выбор</h1>
          <div className={classes.form_container}>
            <div className={classes.input_container}>
              <Input type="text" placeholder="Откуда"
                     value={departureValue}
                     onChange={(event: any) => {
                       setDepartureValue(event.target.value)
                     }}
              />
              <DropDown value={departureValue} cityClickHandler={cityDepartureClickHandler}/>
            </div>
            <div className={classes.arrows} onClick={switchHandler}/>
            <div className={classes.input_container}>
              <Input type="text" placeholder="Куда"
                     value={arrivalValue}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       setArrivalValue(event.target.value)
                     }}
              />
              <DropDown value={arrivalValue} cityClickHandler={cityArrivalClickHandler}/>
            </div>
            <div className={classes.input_container}>
              <DateInput label={''} value={dateValue} readOnly
                         onChange={(date) => {
                           setDateValue(date);
                         }}
              />
            </div>
            <div className={classes.input_container}>
              <Input type="number" placeholder="Мест" min="1" value={seatsValue}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                       setSeatsValue(event.target.value)
                     }}/>
            </div>
            <Button  onClick={()=>navigate('/main')} disabled={formIsValid}>Поиск</Button>
          </div>
        </div>
      </form>
  );
};

