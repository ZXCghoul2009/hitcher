import React, {useState, useEffect} from "react";
import classes from './MainPage.module.css'
import {Input} from "../../../UI/Input/Input";
import {Card} from '../../Card/Card';
import {Button} from "../../../UI/Buttons/Button";
import {Cities} from "../../../Data/Cities";
import {DateInput} from "../../../UI/fields";
import {useTypedSelector} from "../../../utils/hooks/useTypedSelector";
import {useActions} from "../../../utils/hooks/useActions";
// раздетить на компоненты адаптив
// картинку для свитча городов
export const MainPage: React.FC = () => {
    let date = new Date();
    const {trips} = useTypedSelector(state => state.trip)
    const {fetchTrip} = useActions()
    const [departureValue, setDepartureValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');
    const [dateValue, setDateValue] = useState(date);
    const [seatsValue, setSeatsValue] = useState('1')
    const [formIsValid, setFormIsValid] = useState(false)
    const [notFound, setNotFound] = useState(true);


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
            fetchTrip(arrivalValue.trim(), seatsValue, dateValue.toLocaleDateString().split('.').reverse().join('-'), departureValue.trim())
            setNotFound(true)
        }
        if (trips.length === 0) {
          setNotFound( false)
        }
    }
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
                    <hr/>
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
                    <hr/>
                    <div className={classes.input_container}>
                        <DateInput label={''} value={dateValue} readOnly
                               onChange={(date)=>{
                                   setDateValue(date);
                               }}

                        />
                    </div>
                    <hr/>
                    <div className={classes.input_container}>
                        <Input type="number" placeholder="Мест" min="1" value={seatsValue}
                               onChange={(event :React.ChangeEvent<HTMLInputElement>)=>{
                                   setSeatsValue(event.target.value)
                               }}/>
                    </div>
                    <hr/>
                    <Button  disabled={formIsValid}
                    >Поиск</Button>

            </div>

            </div>
            </form>
            {!notFound && <h1 className={classes.not_found_text}>Поездки не найдены</h1> }
            <Card trips={trips}/>
        </div>
    )
}