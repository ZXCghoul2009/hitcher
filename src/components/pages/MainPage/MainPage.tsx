import React, {useState, useEffect} from "react";
import classes from './MainPage.module.css'
import {Card} from '../../Card/Card';
import {Loading} from "../../../UI/Loading/Loading";
import useLocalStorage from "use-local-storage";
import axios from "axios";
import {Dialog} from "@headlessui/react";
import {options, resetLocalStorage} from "../../../utils/helpers/localstorage/localstorage";
import {FilterTrips} from "../../FilterTrips/FilterTrips";
import {Trip} from "../../../utils/types/types";
import {SearchTripsForm} from "../../SearchForm/SearchTripsForm";

interface InitialCheckedInterface {
  li1:boolean,
  li2:boolean,
  li3:boolean,
  li4: boolean
}

export const MainPage: React.FC = () => {

  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", [])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [fetchIsFinished, setFetchIsFinished] = useState<boolean>(false)
  const [checked, setChecked] = useState({li1: false, li2: false, li3: false, li4: false})
  const [isOpen, setIsOpen] = useState<boolean>(false)

  let url = decodeURI('http://localhost:8081/get')

  const updateFields = (fields: Partial<InitialCheckedInterface>) => {
    setChecked(prev => {
      return { ...prev, ...fields }
    })
  }

  const params = {
    arrival: localStorage.getItem('arrival')?.trim().slice(1, -1),
    seats: localStorage.getItem('seats')?.trim().slice(1, -1),
    day: options.parser(localStorage.getItem('date')).toLocaleDateString().split('.').reverse().join('-'),
    departure: localStorage.getItem('departure')?.trim().slice(1, -1)
  }

  useEffect(() => {
    window.addEventListener("beforeunload", resetLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", resetLocalStorage);
    };
  }, []);


  useEffect(()=>{
    if (params.departure && params.arrival) {
      sortTrip('http://localhost:8081/get', {
        arrival: params.arrival,
        seats: params.seats,
        day: params.day,
        departure: params.departure
      })
    }
  },[])


  const sortTrip = async (url: string, params: {
    arrival: string | null | undefined;
    day: any;
    seats: string | null | undefined;
    departure: string | null | undefined;
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
    if (checked.li1) {
      setFetchIsFinished(false)
      sortTrip('http://localhost:8081/get/before_six_am', params)
      setFetchIsFinished(true)
    }
    if (checked.li2) {
      setFetchIsFinished(false)
      sortTrip('http://localhost:8081/get/form_six_to_noon', params)
      setFetchIsFinished(true)
    } else if (checked.li3) {
      console.log(url)
    } else if (checked.li4) {
      url = 'http://localhost:8082/get/after_six_pm'
      console.log(url)
    } else if (!!trips.length && !checked.li1 && !checked.li2 && !checked.li3 && !checked.li4) {
      sortTrip('http://localhost:8081/get', params)
    }
  }, [checked])


  return (
      <>
        <SearchTripsForm setIsLoading={setIsLoading} setTrips={setTrips} setError={setError} setFetchIsFinished={setFetchIsFinished}/>
        <div className={classes.content}>
          {trips.length !== 0 && <div className={classes.sort_items}>
              <h3>Время выезда</h3>
              <FilterTrips checked={checked} updateFields={updateFields}/>
          </div>}
          <div className={classes.cards}>
            <Card trips={trips}/>
            <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
              <div className={classes.sort_items_container}>
                <Dialog.Panel>
                  <div className={classes.sort_items_mobile}>
                    <h3>Время выезда</h3>
                    <FilterTrips checked={checked} updateFields={updateFields}/>
                    <button className={classes.button} onClick={() => setIsOpen(false)}>Готово</button>
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
          {trips.length > 0 &&
          <button  onClick={() => setIsOpen(true)} className={classes.button_filter}>Отфильтровать</button>}
        </div>
      </>
  )
}