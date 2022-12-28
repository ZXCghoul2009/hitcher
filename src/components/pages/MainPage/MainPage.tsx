import React, {useState, useEffect} from "react";
import classes from './MainPage.module.css'
import {Input} from "../../../UI/Input/Input";
import {Card} from '../../Card/Card';
import {DropDown} from "../../Dropdown/DropDown";
import {Button} from "../../../UI/Buttons/Button";
import {DateInput} from "../../../UI/fields";
import {Loading} from "../../../UI/Loading/Loading";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import {Dialog} from "@headlessui/react";
import {options, resetLocalStorage} from "../../../utils/helpers/localstorage/localstorage";
import {FilterTrips} from "../../FilterTrips/FilterTrips";


// раздетить на компоненты адаптив
// картинку для свитча городов

export const MainPage: React.FC = () => {
  let date = new Date()

  const [departureValue, setDepartureValue] = useLocalStorage<string>("departure", '');
  const [arrivalValue, setArrivalValue] = useLocalStorage<string>("arrival", '');
  const [dateValue, setDateValue] = useLocalStorage<Date>('date', date, options)
  const [seatsValue, setSeatsValue] = useLocalStorage<string>("seats", '1')
  const [trips, setTrips] = useLocalStorage<any[]>("trips", [])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [formIsValid, setFormIsValid] = useState(false)
  const [fetchIsFinished, setFetchIsFinished] = useState(false)
  const [checked, setChecked] = useState({li1: false, li2: false, li3: false, li4: false})
  const [isOpen, setIsOpen] = useState(false)

  let url = decodeURI('http://localhost:8081/get')

  const params = {
    arrival: arrivalValue.trim(),
    seats: seatsValue,
    day: dateValue.toLocaleDateString().split('.').reverse().join('-'),
    departure: departureValue.trim()
  }

  const switchHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    setDepartureValue(arrivalValue);
    setArrivalValue(departureValue);
  }

  useEffect(() => {
    window.addEventListener("beforeunload", resetLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", resetLocalStorage);
    };
  }, []);



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
    } catch (e) {
      setError(`${e}`)
      setIsLoading(false)
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


  const cityDepartureClickHandler = (event: any) => {
    setDepartureValue(event.target.textContent)
  }

  const cityArrivalClickHandler = (event: any) => {
    setArrivalValue(event.target.textContent)
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
    if (checked.li1) {
      url = 'http://localhost:8081/get/before_six_am'
      setFetchIsFinished(false)
      fetchTrip(url, params)
      setFetchIsFinished(true)
    }
    if (checked.li2) {
      url = 'http://localhost:8081/get/form_six_to_noon'
      setFetchIsFinished(false)
      fetchTrip(url, params)
      setFetchIsFinished(true)
    } else if (checked.li3) {
      url = ''
      console.log(url)

    } else if (checked.li4) {
      url = 'http://localhost:8082/get/after_six_pm'
      console.log(url)
    } else if (!!trips.length && !checked.li1 && !checked.li2 && !checked.li3 && !checked.li4) {
      fetchTrip('http://localhost:8081/get', params)
    }
  }, [checked])


  return (
      <>
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
              <Button disabled={formIsValid}>Поиск</Button>
            </div>
          </div>
        </form>
        <div className={classes.content}>
          {trips.length !== 0 && <div className={classes.sort_items}>
              <h3>Время выезда</h3>
              <FilterTrips checked={checked} setChecked={setChecked}/>
          </div>}
          <div className={classes.cards}>
            <Card trips={trips}/>
            <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
              <div className={classes.sort_items_container}>
                <Dialog.Panel>
                  <div className={classes.sort_items_mobile}>
                    <h3>Время выезда</h3>
                    <FilterTrips checked={checked} setChecked={setChecked}/>
                    <button onClick={() => setIsOpen(false)}>Готово</button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
            <div className={classes.loading}>
              {loading && <Loading type={'spin'} color={'#7588ff'}/>}
            </div>
          </div>
        </div>
        <div className={classes.errors}>
          {trips.length === 0 && !loading && fetchIsFinished &&
          <h1 className={classes.not_found_text}>Поездки не найдены</h1>}
          {!!trips && error}
          {trips.length > 0 &&
          <button onClick={() => setIsOpen(true)} className={classes.button_filter}>Отфильтровать</button>}
        </div>
      </>
  )
}