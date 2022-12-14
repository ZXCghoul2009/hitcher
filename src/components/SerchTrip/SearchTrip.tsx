import React, {useState, useEffect} from "react";
import classes from './SearchTrip.module.css'
import {Input} from "../../UI/Input/Input";
import {Button} from "../../UI/Buttons/Button";
import {Cities} from "../../Data/Cities";
import axios from "axios";
import {DateInput} from "../../UI/fields";
import {Cards} from "../../utils/types/types";
// раздетить на компоненты адаптив
// картинку для свитча городов
export const SearchTrip: React.FC = () => {
    let date = new Date();
    const [departureValue, setDepartureValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');
    const [dateValue, setDateValue] = useState(date);
    const [seatsValue, setSeatsValue] = useState('1')
    const [formIsValid, setFormIsValid] = useState(false)



    const switchHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        setDepartureValue(arrivalValue);
        setArrivalValue(departureValue);

    }

    useEffect(()=>{

    },[])


    useEffect(()=> {
        const identifier = setTimeout(()=>{
            setFormIsValid(
                departureValue.length > 3 && arrivalValue.length > 3
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




    return (
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
                        <Button  disabled={!formIsValid}
                        >Поиск</Button>

                    </div>
    )
}