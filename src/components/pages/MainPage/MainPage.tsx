import React, {useState, useEffect} from "react";
import classes from './MainPage.module.css'
import {Input} from "../../../UI/Input/Input";
import {Card} from '../../Card/Card';
import {Button} from "../../../UI/Buttons/Button";
import {Cities} from "../../../Data/Cities";
import {CheckBox, DateInput} from "../../../UI/fields";
import {useTypedSelector} from "../../../utils/hooks/useTypedSelector";
import {useActions} from "../../../utils/hooks/useActions";
// раздетить на компоненты адаптив
// картинку для свитча городов
//  sort component
export const MainPage: React.FC = () => {
    let date = new Date();
    const {trips} = useTypedSelector(state => state.trip)
    const {fetchTrip} = useActions()
    const [departureValue, setDepartureValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');
    const [dateValue, setDateValue] = useState(date);
    const [seatsValue, setSeatsValue] = useState('1')
    const [formIsValid, setFormIsValid] = useState(false)
    const [checked, setChecked] = useState({li1: false, li2: false, li3: false, li4: false})
    let url = 'http://localhost:8081/get'

    const switchHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        setDepartureValue(arrivalValue);
        setArrivalValue(departureValue);

    }


    useEffect(()=> {
        const identifier = setTimeout(()=>{
            setFormIsValid(
                departureValue.length > 2 && arrivalValue.length > 2
            )
        }, 500)
        return () => {
            clearTimeout(identifier);
        }
    }, [ departureValue, arrivalValue ])

    const filteredDepartureCities = Cities.filter(city => {
        if (departureValue.length > 1) {
            return city.name.toLowerCase().includes(departureValue.toLowerCase());
        } else return null;
    })

    const filteredArrivalCities = Cities.filter(city => {
        if (arrivalValue.length > 1) {
            return city.name.toLowerCase().includes(arrivalValue.toLowerCase());
        } else return null;
    })


    const cityDepartureClickHandler = (event: any) => {
        setDepartureValue(event.target.textContent)
    }

    const cityArrivalClickHandler = (event: any) => {
        setArrivalValue(event.target.textContent)
    }

    const submitHandler = ( event: React.FormEvent) => {
        event.preventDefault();
      if (formIsValid) {
        fetchTrip(url, arrivalValue.trim(), seatsValue, dateValue.toLocaleDateString().split('.').reverse().join('-'), departureValue.trim())
      }
    }
    useEffect(() => {
    if (checked.li1) {
      url = 'http://localhost:8081/get/before_six_am'
      fetchTrip(url, arrivalValue.trim(), seatsValue, dateValue.toLocaleDateString().split('.').reverse().join('-'), departureValue.trim())
    }
    if (checked.li2) {
      url = 'http://localhost:8081/get/form_six_to_noon'
      fetchTrip(url, arrivalValue.trim(), seatsValue, dateValue.toLocaleDateString().split('.').reverse().join('-'), departureValue.trim())
    }
    if (checked.li3) {
      url = ''
      console.log(url)
    }
    if (checked.li4) {
      url = 'http://localhost:8082/get/after_six_pm'
      console.log(url)
    }
      if ( !checked.li1 && !checked.li2 && !checked.li3 && !checked.li4 ) {
        fetchTrip('http://localhost:8081/get', arrivalValue.trim(), seatsValue, dateValue.toLocaleDateString().split('.').reverse().join('-'), departureValue.trim())
      }
    }, [checked])
    return (
        <div className={classes.page}>
            <form   onSubmit={submitHandler}>
            <div className={classes.container}>
            <h1>Поездки на ваш выбор</h1>
            <div className={classes.form_container}>

                    <div className={classes.input_container}>
                        <Input type="text" placeholder="Откуда"
                               value={departureValue}
                               onChange={(event :any)=>{
                                   setDepartureValue(event.target.value)
                               }}
                        />
                        <ul className={classes.auto_complete}>
                            {
                                departureValue ? filteredDepartureCities.map((item:any) => {
                                    return (
                                        <li
                                            onClick={cityDepartureClickHandler}
                                        >{item.name} </li>
                                )
                            }) : null
                            }
                        </ul>
                    </div>
                <div className={classes.arrows} onClick={switchHandler}/>
                    <div className={classes.input_container} >
                        <Input type="text" placeholder="Куда"
                               value={arrivalValue}
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   setArrivalValue(event.target.value)
                               }}
                        />
                        <ul className={classes.auto_complete}>
                            {
                                arrivalValue ? filteredArrivalCities.map((item:any) => {
                                    return (
                                        <li
                                            onClick={cityArrivalClickHandler}
                                        >{item.name} </li>
                                    )
                                }) : null
                            }
                        </ul>
                    </div>
                    <div className={classes.input_container}>
                        <DateInput label={''} value={dateValue} readOnly
                               onChange={(date)=>{
                                   setDateValue(date);
                               }}

                        />
                    </div>
                    <div className={classes.input_container}>
                        <Input type="number" placeholder="Мест" min="1" value={seatsValue}
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   setSeatsValue(event.target.value)
                               }}/>
                    </div>
                    <Button  disabled={formIsValid}>Поиск</Button>
            </div>
            </div>
            </form>
          {trips.length !== 0 && <div className={classes.content}>
              <div className={classes.sort_items}>
                  <h3>Время выезда</h3>
                  <ul>
                      <li >
                          <CheckBox
                              onClick={() => setChecked({...checked, li1: !checked.li1, li2: false, li3: false, li4: false })  }
                              checked={checked.li1}
                              label={'До 6:00'}
                          />
                      </li>
                      <li ><CheckBox onClick={() => setChecked({...checked, li2: !checked.li2, li1: false, li3: false, li4: false })} checked={checked.li2} label={'6:00-12:00'}/></li>
                      <li ><CheckBox onClick={() => setChecked({...checked, li3: !checked.li3, li1: false, li2: false, li4: false }) } checked={checked.li3} label={'12:00-18:00'}/></li>
                      <li ><CheckBox onClick={() => setChecked({...checked, li4: !checked.li4, li1: false, li2: false, li3: false }) } checked={checked.li4} label={'После 18:00'}/></li>
                  </ul>
              </div>
              <div className={classes.cards}>
                {trips.length === 0 && <h1 className={classes.not_found_text}>Поездки не найдены</h1> }
                  <Card trips={trips}/>
              </div>
          </div> }

        </div>
    )
}